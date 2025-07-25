package com.example.chathistory.logic;

import com.example.chathistory.ai.AiModel;
import com.example.chathistory.models.Prompt;
import com.example.chathistory.models.Queries;
import com.example.chathistory.repository.QueryRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class Logic {
    private final AiModel aiModel;
    private final QueryRepository queryRepository;
    public Logic(AiModel aiModel, QueryRepository queryRepository) {
        this.aiModel = aiModel;
        this.queryRepository = queryRepository;
    }

    public String aiResponse(Prompt prompt) {
        String response = aiModel.response(prompt.getPrompt());
        this.queryRepository.save(new Queries(UUID.randomUUID(), prompt.getPrompt(), response));
        return response;
    }


}
