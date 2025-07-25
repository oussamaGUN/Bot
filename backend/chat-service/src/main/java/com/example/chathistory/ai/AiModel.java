package com.example.chathistory.ai;

import lombok.Data;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Data
@Service
public class AiModel {
    private final ChatClient chatClient;

    public AiModel(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    public String response(String input) {
        return chatClient.prompt(input).call().content();
    }
}