package com.example.messageBoard;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;

import java.awt.PageAttributes.MediaType;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
@SpringBootTest
class MessageBoardApplicationTests {

	@Mock
	private PostRepository postRepository;
	
	@Mock
	private AuthRepository authRepository;
	 
	@InjectMocks
	private PostController postController;
	
	    @BeforeEach
	    public void setup() {
	        MockitoAnnotations.initMocks(this);
	        postController = new PostController(postRepository, authRepository);
	        postRepository.deleteAll();
	        authRepository.deleteAll();
	    }

	    @Test
	    public void savePostTest(){
	    	
	    	AuthModel auth=AuthModel.builder().userId(1L).username("hajra").firstName("hajra").lastName("khan").build();
		      PostModel postModel= PostModel.builder()
		    		  .userId(auth) 
		    		  .postId(1L).message("Hello").build();
		      when(postRepository.save(postModel)).thenReturn(postModel);
	    	ResponseEntity<List<PostModel>> response=postController.addPost(postModel);

	    	assertEquals(HttpStatus.CREATED, response.getStatusCode());
	    	assertEquals(postModel, response.getBody());
	    }
	   
	    
	    @Test
	    public void testGetAllPosts() {
	        List<PostModel> postList = new ArrayList<>();
	        postList.add(PostModel.builder().postId(1L).message("Hello").build());
	        when(postRepository.findAll()).thenReturn(postList);

	        ResponseEntity<List<PostModel>> response = postController.getAllPosts();
	        assertEquals(HttpStatus.OK, response.getStatusCode());
	        assertEquals(postList, response.getBody());
	    }

}
