package springbootsessionauth.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping
	public String helloEveryone() {
		return "Hello";
	}
	
	@GetMapping("/user")
	public String helloUser() {
		return "Hello user";
	}
	
	@GetMapping("/admin")
	public String helloAdmin() {
		return "Hello admin";
	}
	
}
