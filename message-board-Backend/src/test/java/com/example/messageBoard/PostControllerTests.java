package com.example.messageBoard;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
@RunWith(MockitoJUnitRunner.class)
public class PostControllerTests {
	
	@Mock
	private PostRepository postRepository;
	
	@Mock
	private AuthRepository authRepository;
	
	@InjectMocks
	private PostController postController;
	

	@Test
	public void testUpdatePost() {
		// create a test post
		PostModel post = PostModel.builder()
				.postId(1L)
				.message("Test message")
				.userId(AuthModel.builder().userId(1L).build())
				.build();
		
		// mock the auth repository to return the user
		when(authRepository.findById(1L)).thenReturn(Optional.of(AuthModel.builder().userId(1L).build()));
		
		// mock the post repository to return the original post and then the updated post
		when(postRepository.findById(1L)).thenReturn(Optional.of(post));
		when(postRepository.save(post)).thenReturn(post);
		
		// create an updated version of the post
		PostModel updatedPost = PostModel.builder()
				.postId(1L)
				.message("Updated test message")
				.userId(AuthModel.builder().userId(1L).build())
				.build();
		
		// make the request to update the post
		ResponseEntity response = postController.updatePost(1L, updatedPost);
		
		// assert that the response has a 200 status code
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		// assert that the response body is equal to the updated post
		assertEquals(updatedPost, response.getBody());
	}
	
	@Test
	public void testDeletePost() {
		// create a test post
		PostModel post = PostModel.builder()
				.postId(1L)
				.message("Test message")
				.userId(AuthModel.builder().userId(1L).build())
				.build();
		
		// mock the auth repository to return the user
		when(authRepository.findById(1L)).thenReturn(Optional.of(AuthModel.builder().userId(1L).build()));
		
		// mock the post repository to return the original post and then delete it
		when(postRepository.findById(1L)).thenReturn(Optional.of(post));
		doNothing().when(postRepository).deleteById(1L);
		
		// make the request to delete the post
		ResponseEntity response = postController.deletePost(1L, post);
		
		// assert that the response has a 200 status code
		assertEquals(HttpStatus.OK, response.getStatusCode());
		
		// assert that the response body is equal to the original post
		assertEquals(post, response.getBody());
	}
	
	@Test
	public void testGetAllPosts() {
		// create a list

	}
}