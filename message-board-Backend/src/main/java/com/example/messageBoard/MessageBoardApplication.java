package com.example.messageBoard;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.boot.SpringApplication;

@SpringBootApplication
@Import(SecurityConfig.class)
@CrossOrigin(origins = "http://localhost:4200/")
public class MessageBoardApplication {

	public static void main(String[] args) {
		SpringApplication.run(MessageBoardApplication.class, args);
	}

}
