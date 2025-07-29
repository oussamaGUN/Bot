package com.example.chathistory.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Queries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String workflowId;
    private String email;
    @Column(columnDefinition = "TEXT") // for large text fields
    private String prompt;
    @Column(columnDefinition = "TEXT") // for large text fields
    private String response;
}
