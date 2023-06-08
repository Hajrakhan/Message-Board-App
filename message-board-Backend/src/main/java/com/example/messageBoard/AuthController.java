package com.example.messageBoard;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthController {
	
	 private final AuthRepository authRepository;
    public AuthController(AuthRepository authRepository) {
        this.authRepository = authRepository;
        
    }

    @PostMapping("/register")
    public ResponseEntity<AuthModel> register(@RequestBody AuthModel post) {
        try {
        	String encryptedPassword = encryptPassword(post.getPassword());
            post.setPassword(encryptedPassword);
        	post.setTimeStamp();
        	AuthModel postObj = authRepository.save(post);
            return new ResponseEntity<>(postObj, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthModel> login(@RequestBody AuthModel post) {
        try {
     
            AuthModel user = authRepository.findByUsername(post.getUsername());
            
            // Check if the user exists and the password matches
            if (user != null && verifyPassword(post.getPassword(), user.getPassword())) {
                return ResponseEntity.ok(user);
            } else {
                // Invalid credentials
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    private boolean verifyPassword(String rawPassword, String encodedPassword) {
    	   BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(rawPassword, encodedPassword);
      }


    
    
private String encryptPassword(String password) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    return encoder.encode(password);
}
}