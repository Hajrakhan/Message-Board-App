package com.example.messageBoard;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<AuthModel,Long> {
	AuthModel findByUsername(String username);
	Optional<AuthModel> findById(Long userId);
}