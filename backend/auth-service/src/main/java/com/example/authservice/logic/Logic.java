package com.example.authservice.logic;

import com.example.authservice.models.RegisterRequest;
import com.example.authservice.models.Users;
import com.example.authservice.repository.UsersRepo;
import com.example.authservice.utils.CookieUtil;
import com.example.authservice.utils.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class Logic {
    private final UsersRepo usersRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public Logic(UsersRepo usersRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, CookieUtil cookieUtil, KafkaTemplate<String, String> kafkaTemplate) {
        this.usersRepo = usersRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
        this.kafkaTemplate = kafkaTemplate;
    }

    public ResponseEntity<String> register(RegisterRequest registerRequest) {
        if (this.usersRepo.existsByEmail(registerRequest.getEmail()))
            return ResponseEntity.status(HttpStatus.CONFLICT).body("email already exist");
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword()))
            return ResponseEntity.status(HttpStatus.CONFLICT).body("not matching passwords");
        Users user = new Users();
        user.setEmail(registerRequest.getEmail());;
        user.setPassword(this.passwordEncoder.encode(registerRequest.getPassword()));
        this.usersRepo.save(user);
        this.kafkaTemplate.send("email", user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(user.toString());
    }

    public ResponseEntity<String > signin(HttpServletResponse response, Users user) {
        if (!this.usersRepo.existsByEmail(user.getEmail()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("email not found");
        Users current_user = this.usersRepo.getUsersByEmail(user.getEmail());
        if (!this.passwordEncoder.matches(user.getPassword(), current_user.getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid password");
        String access_token = this.jwtUtil.generateToken(user.getEmail());
        String refresh_token = this.jwtUtil.generateRefreshToken(user.getEmail());
        this.cookieUtil.setTokenCookie(response, "access_token", access_token);
        this.cookieUtil.setTokenCookie(response, "refresh_token", refresh_token);
        return ResponseEntity.status(HttpStatus.OK).body("logged in successfully");
    }


    public ResponseEntity<Users> getUserById(Long id) {
        if (!this.usersRepo.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        Users user = this.usersRepo.getUsersById(id);
        return ResponseEntity.status(HttpStatus.FOUND).body(user);
    }

    public ResponseEntity<String> new_accessToken(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        String token = null;
        for (Cookie cookie : cookies) {
            if (cookie != null) {
                if (cookie.getName().equals("refresh_token"))
                {
                    token = cookie.getValue();
                    if (this.jwtUtil.validateToken(token).equals("INVALID"))
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("need to login");
                    String email = this.jwtUtil.getAllClaims(token).getSubject();
                    String access_token = this.jwtUtil.generateToken(email);
                    this.cookieUtil.setTokenCookie(response, "access_token", access_token);
                    return ResponseEntity.status(HttpStatus.CREATED).body("new access token created");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("needs to login");
    }

    public ResponseEntity<String> google(HttpServletResponse response, String email) {
        Users user = new Users();
        user.setEmail(email);
        user.setPassword(null);
        this.usersRepo.save(user);
        String access_token = this.jwtUtil.generateToken(email);
        String refresh_token = this.jwtUtil.generateRefreshToken(email);
        this.cookieUtil.setTokenCookie(response, "access_token", access_token);
        this.cookieUtil.setTokenCookie(response, "refresh_token", refresh_token);
        System.out.println(email);
        this.kafkaTemplate.send("email", email);
        return ResponseEntity.status(HttpStatus.OK).body("logged successfully");
    }

    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        String email = request.getHeader("email");
        this.cookieUtil.deleteTokenCookie(response, "access_token", "");
        this.cookieUtil.deleteTokenCookie(response, "refresh_token", "");
        return ResponseEntity.status(HttpStatus.OK).body("log out successfully");
    }
}
