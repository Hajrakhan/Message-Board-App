package com.example.messageBoard;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.Builder;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder // Add the @Builder annotation to enable the builder pattern
public class PostModel {
	
	public PostModel(String message) {
	    this.message = message;
	}

	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postId;

    @Column(name = "message")
    private String message;

    @Column
    private Timestamp timeStamp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private AuthModel userId;
    

   
    public void setTimeStamp() {
    	Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now()); // Convert LocalDateTime to Timestamp
       
        this.timeStamp = timestamp;
    }
    
 
  
}
