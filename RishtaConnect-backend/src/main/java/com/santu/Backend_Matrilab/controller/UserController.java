package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.UserDTO;
import com.santu.Backend_Matrilab.dto.response.Response;
import com.santu.Backend_Matrilab.service.interfac.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;




//    @GetMapping("/get-by-id/{userId}")
//    public ResponseEntity<Response> getUserById(@PathVariable("userId") String userId) {
//        Response response = userService.getUserById(userId);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable("userId") String userId) {
        Response response = userService.getUserById(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<Response> getLoggedInUserProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // New endpoint to get all users
//    @GetMapping("/get-all")
//    public ResponseEntity<Response> getAllUsers() {
//        Response response = userService.getAllUsers();
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllUsers() {
        Response response = new Response();
        try {
            List<UserDTO> users = userService.getAllUsers();
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Users fetched successfully.");
            response.setUserList(users);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("An error occurred while fetching users.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




}
