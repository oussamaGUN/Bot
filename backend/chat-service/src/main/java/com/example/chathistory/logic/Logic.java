package com.example.chathistory.logic;

import com.example.chathistory.ai.AiModel;
import com.example.chathistory.models.Prompt;
//import com.example.chathistory.models.Queries;
//import com.example.chathistory.repository.QueryRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class Logic {
    private final AiModel aiModel;
//    private final QueryRepository queryRepository;
    public Logic(AiModel aiModel) {
        this.aiModel = aiModel;
//        this.queryRepository = queryRepository;
    }

    public String aiResponse(Prompt prompt) {
        //        System.out.println(response);
//        this.queryRepository.save(new Queries(UUID.randomUUID(), prompt.getPrompt(), response));
        return aiModel.response(prompt.getPrompt());
    }


}
