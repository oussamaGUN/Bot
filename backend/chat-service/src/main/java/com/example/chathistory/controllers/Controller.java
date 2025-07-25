package com.example.chathistory.controllers;

import com.example.chathistory.logic.Logic;
import com.example.chathistory.models.Prompt;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
public class Controller {
    private final Logic logic;

    public Controller(Logic logic) {
        this.logic = logic;
    }

    @GetMapping("/prompt")
    private String prompt(@RequestBody Prompt prompt) {
        return this.logic.aiResponse(prompt);
    }

}
