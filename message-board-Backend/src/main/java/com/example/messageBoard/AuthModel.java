package com.example.messageBoard;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder // Add the @Builder annotation to enable the builder pattern
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AuthModel {
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "username")
    private String username;
    
    @Column(name = "password")
    private String password;

    @Column
    private Timestamp timeStamp;

   
   
    public void setTimeStamp() {
    	Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now()); // Convert LocalDateTime to Timestamp
       
        this.timeStamp = timestamp;
    }
  
}
