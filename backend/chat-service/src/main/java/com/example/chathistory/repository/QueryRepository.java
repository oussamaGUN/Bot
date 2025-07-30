package com.example.chathistory.repository;

import com.example.chathistory.models.Queries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QueryRepository extends JpaRepository<Queries, UUID> {
    List<Queries> findAllByEmail(String email);
    // You can add custom methods here if needed
}
