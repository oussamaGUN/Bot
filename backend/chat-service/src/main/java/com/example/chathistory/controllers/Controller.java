package com.example.chathistory.controllers;

import com.example.chathistory.logic.Logic;
import com.example.chathistory.models.Prompt;

import com.example.chathistory.models.Queries;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {
    private final Logic logic;

    public Controller(Logic logic) {
        this.logic = logic;
    }

    @PostMapping("/prompt")
    private String prompt(@RequestBody Prompt prompt, HttpServletRequest request) {
        return this.logic.aiResponse(prompt, request.getHeader("email"));
    }
    @GetMapping("queries")
    private List<Queries> queries(HttpServletRequest request) {
        return this.logic.getAllqueries(request);
    }
}
