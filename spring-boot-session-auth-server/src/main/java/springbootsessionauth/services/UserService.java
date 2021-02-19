package springbootsessionauth.services;

import java.util.List;

import springbootsessionauth.models.RegisterUserDTO;
import springbootsessionauth.models.UpdateUserDTO;
import springbootsessionauth.models.MyUserView;
import springbootsessionauth.models.OtherUserView;

public interface UserService {
	
	List<OtherUserView> getUsersViews();
	
	MyUserView getMyUserView(String username);
	
	OtherUserView getOtherUserView(String username);
	
	boolean createUser(RegisterUserDTO registerUserDto);
	
	void deleteUser(String username);
	
	MyUserView updateUser(String username, UpdateUserDTO updateUserDto);

}
