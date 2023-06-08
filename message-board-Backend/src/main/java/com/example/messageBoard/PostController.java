package com.example.messageBoard;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.util.HtmlUtils;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:4200/")
public class PostController {
	
	private static final Logger logger = LoggerFactory.getLogger(PostController.class);

	 private final PostRepository postRepository;
	 private final AuthRepository authRepository;
     public PostController(PostRepository postRepository,AuthRepository authRepository) {
        this.postRepository = postRepository;
        this.authRepository=authRepository;        
    }
     @MessageMapping("/addPost")
     @SendTo("/topic/postChanged")
     public List<PostModel> addPostNew(@RequestBody PostModel post) throws Exception {
    	AuthModel user = authRepository.findById(post.getUserId().getUserId()).orElse(null);
        post.setUserId(user);
        post.setTimeStamp();   
        PostModel postObj = postRepository.save(post);
 	    Thread.sleep(1000); // simulated delay
        List<PostModel> postList = new ArrayList<>();
        postRepository.findAll().forEach(postList::add);

        return postList;
     }
    
     @MessageMapping("/updatePost")
     @SendTo("/topic/postChanged")
     public List<PostModel> updatePostSocket(@RequestBody PostModel updatedPost) throws Exception {
         Optional<PostModel> postData = postRepository.findById(updatedPost.getPostId());
         if (postData.isPresent()) {
             PostModel existingPost = postData.get();
             // Check if the client owns the post before allowing modification
             if (existingPost.getUserId().getUserId().equals(updatedPost.getUserId().getUserId())) {
                 existingPost.setMessage(updatedPost.getMessage());
                 existingPost.setTimeStamp(); 
                 PostModel updatedPostObj = postRepository.save(existingPost);
                 List<PostModel> postList = new ArrayList<>();
                 postRepository.findAll().forEach(postList::add);

                 return postList;
                 
             } else {
                 throw new UnauthorizedException("User is not authorized to update this post.");
             }
         } else {
             throw new NotFoundException("Post not found.");
         }
     }
     
     @MessageMapping("/deletePost")
     @SendTo("/topic/postChanged")
     public List<PostModel> deletePostNew(@RequestBody PostModel post) throws Exception {
    	 try {
             Optional<PostModel> postData = postRepository.findById(post.getPostId());
             if (postData.isPresent()) {
                 PostModel existingPost = postData.get();
                 // Check if the client owns the post before allowing deletion
                 if (existingPost.getUserId().getUserId().equals(post.getUserId().getUserId())) {
                     postRepository.deleteById(post.getPostId());
                     List<PostModel> postList = new ArrayList<>();
                     postRepository.findAll().forEach(postList::add);

                     return postList;
                 } else {
                	 throw new UnauthorizedException("User is not authorized to update this post.");
                 }
             }
             throw new NotFoundException("Post not found.");
         } catch (Exception e) {
        	 throw new NotFoundException("error.");
         }
     }
     
     
     //simple apis
     
     @MessageMapping("/add")
     @SendTo("/getAll")
     public  PostModel add(@RequestBody PostModel post) throws Exception {
    	
 	        AuthModel user = authRepository.findById(post.getUserId().getUserId()).orElse(null);
 	        post.setUserId(user);
 	        post.setTimeStamp();   
 	       PostModel postObj = postRepository.save(post);
 	      Thread.sleep(1000); // simulated delay
 	      return postObj;
 	    
    	 }
     
    @GetMapping("/getAllPosts")
    public ResponseEntity<List<PostModel>> getAllPosts()  {
        try {
            List<PostModel> postList = new ArrayList<>();
            postRepository.findAll().forEach(postList::add);

            if (postList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return ResponseEntity.status(HttpStatus.OK).body(postList);
        } catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/getPostById/{id}")
    public ResponseEntity<PostModel> getPostById(@PathVariable Long id) {
        Optional<PostModel> postObj = postRepository.findById(id);
        if (postObj.isPresent()) {
            return new ResponseEntity<>(postObj.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/addPost")
    public ResponseEntity addPost(@RequestBody PostModel post) {
    	 try {
    	        AuthModel user = authRepository.findById(post.getUserId().getUserId()).orElse(null);
    	        post.setUserId(user);
    	        post.setTimeStamp();   
    	        PostModel postObj = postRepository.save(post);
    	        return new ResponseEntity<>(postObj, HttpStatus.CREATED);
    	    } catch (Exception e) {
    	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	    }
    }

    @PutMapping("/updatePost/{id}")
    public ResponseEntity<PostModel> updatePost(@PathVariable Long id, @RequestBody PostModel updatedPost) {
        try {
            Optional<PostModel> postData = postRepository.findById(id);
            
            if (postData.isPresent()) {
                PostModel existingPost = postData.get();
                // Check if the client owns the post before allowing modification
                if (existingPost.getUserId().getUserId().equals(updatedPost.getUserId().getUserId())) {
                    existingPost.setMessage(updatedPost.getMessage());
                    existingPost.setTimeStamp();
                    PostModel updatedPostObj = postRepository.save(existingPost);
                    return new ResponseEntity<>(updatedPostObj, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/deletePostById/{id}")
    public ResponseEntity<PostModel> deletePost(@PathVariable Long id, @RequestBody PostModel post) {
        try {
            Optional<PostModel> postData = postRepository.findById(id);
            if (postData.isPresent()) {
                PostModel existingPost = postData.get();
                // Check if the client owns the post before allowing deletion
                if (existingPost.getUserId().getUserId().equals(post.getUserId().getUserId())) {
                    postRepository.deleteById(id);
                    return new ResponseEntity<>(existingPost, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public class UnauthorizedException extends RuntimeException {
        public UnauthorizedException(String message) {
            super(message);
        }
    }

    public class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }

}

