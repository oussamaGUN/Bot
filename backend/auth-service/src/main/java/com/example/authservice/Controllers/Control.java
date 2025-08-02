package com.example.authservice.Controllers;

import com.example.authservice.logic.Logic;
import com.example.authservice.models.RegisterRequest;
import com.example.authservice.models.Users;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class Control {
    private final Logic logic;

    public Control(Logic logic) {
        this.logic = logic;
    }

    @PostMapping("/register")
    private ResponseEntity<String > register(@RequestBody RegisterRequest registerRequest) {
        return this.logic.register(registerRequest);
    }
    @PostMapping("/signin")
    private ResponseEntity<String > signin(HttpServletResponse response, @RequestBody Users users) {
        return this.logic.signin(response, users);
    }
    @PostMapping("/google-log")
    private ResponseEntity<String > google_log(HttpServletResponse response, @RequestBody Users users) {
        return this.logic.google(response, users.getEmail());
    }
    @GetMapping("/get-user/{id}")
    private ResponseEntity<Users> getUserById(@PathVariable Long id) {
        return this.logic.getUserById(id);
    }
    @GetMapping("/new-accessToken")
    private ResponseEntity<String > new_accessToken(HttpServletRequest request, HttpServletResponse response) {
        return this.logic.new_accessToken(request, response);
    }
    @GetMapping("/logout")
    private ResponseEntity<String > logout(HttpServletRequest request, HttpServletResponse response) {
        return this.logic.logout(request, response);
    }
}


