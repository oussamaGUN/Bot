package com.example.profile.logic;

import com.example.profile.utils.CookieUtil;
import com.example.profile.utils.JwtUtil;
import com.example.profile.models.UpdateInfo;
import com.example.profile.models.Users;
import com.example.profile.repository.UsersRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class Logic {
    private final UsersRepo usersRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    public Logic(UsersRepo usersRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, CookieUtil cookieUtil) {
        this.usersRepo = usersRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
    }

    public ResponseEntity<String> update_email(@RequestBody UpdateInfo updateInfo, HttpServletRequest request, HttpServletResponse response) {
        System.out.println(updateInfo.toString());
        Users user = this.usersRepo.getUsersByEmail(request.getHeader("email"));
        if (user.getEmail() == null) {
           return ResponseEntity.status(HttpStatus.CONFLICT).body("cannot change the email");
       }
        if (!updateInfo.getNew_email().isEmpty())
       {
           if (user.getEmail().equals(updateInfo.getOld_email())) {
                user.setEmail(updateInfo.getNew_email());
                this.usersRepo.save(user);
                String access_token = this.jwtUtil.generateToken(user.getEmail());
                String refresh_token = this.jwtUtil.generateRefreshToken(user.getEmail());
                this.cookieUtil.setTokenCookie(response, "access_token", access_token);
                this.cookieUtil.setTokenCookie(response, "refresh_token", refresh_token);
               return ResponseEntity.status(HttpStatus.OK).body("updated successfully");
           }
            else {
               return ResponseEntity.status(HttpStatus.CONFLICT).body("email not found");
           }
       }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("empty email");
    }

    public ResponseEntity<String> update_password(UpdateInfo updateInfo, HttpServletRequest request, HttpServletResponse response) {
        Users user = this.usersRepo.getUsersByEmail(request.getHeader("email"));
        if (!updateInfo.getNew_password().isEmpty())
        {
            if (this.passwordEncoder.matches(updateInfo.getOld_password(), user.getPassword())) {
                user.setPassword(this.passwordEncoder.encode(updateInfo.getNew_password()));
                this.usersRepo.save(user);
                return ResponseEntity.status(HttpStatus.OK).body("updated successfully");
            }
            else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("incorrect password");
            }
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("empty password");
    }
}
