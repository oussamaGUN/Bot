package com.example.profile.controller;

import com.example.profile.logic.Logic;
import com.example.profile.models.UpdateInfo;
import com.example.profile.models.Users;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class Controller {
    private final Logic logic;

    public Controller(Logic logic) {
        this.logic = logic;
    }

    @PatchMapping("/update-email")
    private ResponseEntity<String > update_email(@RequestBody UpdateInfo updateInfo, HttpServletRequest request, HttpServletResponse response) {
        return this.logic.update_email(updateInfo, request, response);
    }
    @PatchMapping("/update-password")
    private ResponseEntity<String > update_password(@RequestBody UpdateInfo updateInfo, HttpServletRequest request, HttpServletResponse response) {
        return this.logic.update_password(updateInfo, request, response);
    }
}
