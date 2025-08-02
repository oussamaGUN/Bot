package com.example.notificationservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "email", groupId = "notification-group")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }
}
