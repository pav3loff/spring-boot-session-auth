package springbootsessionauth.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springbootsessionauth.models.MyUserView;
import springbootsessionauth.models.RegisterUserDTO;
import springbootsessionauth.models.UpdateUserDTO;
import springbootsessionauth.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{username}")
	public ResponseEntity<?> getUser(@PathVariable("username") String username, Principal principal) {
		if(principal.getName().equals(username)) {
			return ResponseEntity.ok(userService.getMyUserView(username));
		} else {
			return ResponseEntity.ok(userService.getOtherUserView(username));
		}
	}
	
	@GetMapping
	public ResponseEntity<?> getUsers() {
		return ResponseEntity.ok(userService.getUsersViews());
	}
	
	@PostMapping
	public ResponseEntity<?> createUser(@RequestBody RegisterUserDTO registerUserDto) {
		boolean isCreated = userService.createUser(registerUserDto);
		
		if(isCreated) {
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.badRequest().build();
	}
	
	@DeleteMapping("/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username, Principal principal) {
		if(principal.getName().equals(username)) {
			userService.deleteUser(username);
			
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}
	
	@PutMapping("/{username}")
	public ResponseEntity<?> updateUser(@PathVariable("username") String username, 
			@RequestBody UpdateUserDTO updateUserDto, Principal principal) {
		if(principal.getName().equals(username)) {
			MyUserView newUser = userService.updateUser(username, updateUserDto);
			
			if(newUser != null) {
				return ResponseEntity.ok(newUser);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}

}
