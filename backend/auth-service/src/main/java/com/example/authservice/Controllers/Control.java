package com.example.authservice.Controllers;

import com.example.authservice.logic.Logic;
import com.example.authservice.models.RegisterRequest;
import com.example.authservice.models.Users;
import com.example.authservice.repository.UsersRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;


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
    @PostMapping("/login")
    private ResponseEntity<String > login(HttpServletResponse response, @RequestBody Users users) {
        return this.logic.login(response, users);
    }
    @GetMapping("/get-user/{id}")
    private ResponseEntity<Users> getUserById(@PathVariable Long id) {
        return this.logic.getUserById(id);
    }
    @GetMapping("/new-accessToken")
    private ResponseEntity<String > new_accessToken(HttpServletRequest request, HttpServletResponse response) {
        return this.logic.new_accessToken(request, response);
    }
}


