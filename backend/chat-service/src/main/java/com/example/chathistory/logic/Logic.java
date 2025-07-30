package com.example.chathistory.logic;

import com.example.chathistory.ai.AiModel;
import com.example.chathistory.models.Prompt;
import com.example.chathistory.models.Queries;
import com.example.chathistory.repository.QueryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class Logic {
    private final AiModel aiModel;
    private final QueryRepository queryRepository;
    public Logic(AiModel aiModel, QueryRepository queryRepository) {
        this.aiModel = aiModel;
        this.queryRepository = queryRepository;
    }

    public String aiResponse(Prompt prompt, String email) {
        System.out.println(prompt.toString());
        String response = aiModel.response(prompt.getPrompt());
        Queries queries = new Queries();
        queries.setEmail(email);
        queries.setPrompt(prompt.getPrompt());
        queries.setResponse(response);
        queries.setWorkflowId(prompt.getWorkflowId());
        this.queryRepository.save(queries);
        return response;
    }

    public List<Queries> getAllqueries(HttpServletRequest request) {
        return this.queryRepository.findAllByEmail((request.getHeader("email")));
    }
}
