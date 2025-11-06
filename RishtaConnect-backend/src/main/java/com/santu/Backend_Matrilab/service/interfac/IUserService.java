package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.LoginRequest;
import com.santu.Backend_Matrilab.dto.UserDTO;
import com.santu.Backend_Matrilab.dto.response.Response;
import com.santu.Backend_Matrilab.entities.User;

import java.util.List;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getUserById(String userId);
    Response getMyInfo(String email);
//    Response getAllUsers();

    List<UserDTO> getAllUsers();
}