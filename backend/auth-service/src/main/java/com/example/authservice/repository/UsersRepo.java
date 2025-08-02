package com.example.authservice.repository;

import com.example.authservice.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<Users, Long> {
    boolean existsByEmail(String email);

    Users getUsersByEmail(String email);

    Users getUsersById(Long id);
}
