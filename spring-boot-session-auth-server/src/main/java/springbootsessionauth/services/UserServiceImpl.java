package springbootsessionauth.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import springbootsessionauth.models.RegisterUserDTO;
import springbootsessionauth.models.Role;
import springbootsessionauth.models.UpdateUserDTO;
import springbootsessionauth.models.User;
import springbootsessionauth.models.MyUserView;
import springbootsessionauth.models.OtherUserView;
import springbootsessionauth.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public MyUserView getMyUserView(String username) {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		
		if(optionalUser.isPresent()) {
			return new MyUserView(optionalUser.get());
		} 
		
		return null;
	}

	@Override
	public boolean createUser(RegisterUserDTO registerUserDto) {
		User user = userRepository.save(new User(registerUserDto.getUsername(), 
				passwordEncoder.encode(registerUserDto.getPassword()),
				registerUserDto.getFirstName(), registerUserDto.getLastName(), 
				Role.USER));
		
		if(user != null) {
			return true;
		}
		
		return false;
	}

	@Override
	public List<OtherUserView> getUsersViews() {
		return userRepository.findAll().stream().map(user -> new OtherUserView(user)).collect(Collectors.toList());
	}

	@Override
	public OtherUserView getOtherUserView(String username) {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		
		if(optionalUser.isPresent()) {
			return new OtherUserView(optionalUser.get());
		} 
		
		return null;
	}

	@Override
	public void deleteUser(String username) {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		
		if(optionalUser.isPresent()) {
			userRepository.deleteById(optionalUser.get().getId());
		} 
	}

	@Override
	public MyUserView updateUser(String username, UpdateUserDTO updateUserDto) {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		
		if(optionalUser.isPresent()) {
			User oldUser = optionalUser.get();
			
			oldUser.setFirstName(updateUserDto.getFirstName());
			oldUser.setLastName(updateUserDto.getLastName());
			
			User newUser = userRepository.saveAndFlush(oldUser);
			
			if(newUser != null) {
				return new MyUserView(newUser);
			}
			
			return null;
		} 
		
		return null;
	}

}
