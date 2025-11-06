package com.santu.Backend_Matrilab.dto.response;

import com.santu.Backend_Matrilab.dto.UserDTO;
import java.util.List;

public class Response {
    private int statusCode;
    private String message;
    private List<UserDTO> userList;
    private UserDTO user;
    private Long userId;
    private String token;
    private String role;
    private String expirationTime;  // Added the 'expirationTime' field

    // Getter for statusCode
    public int getStatusCode() {
        return statusCode;
    }

    // Setter for statusCode
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    // Getter for message
    public String getMessage() {
        return message;
    }

    // Setter for message
    public void setMessage(String message) {
        this.message = message;
    }

    // Getter for userList
    public List<UserDTO> getUserList() {
        return userList;
    }

    // Setter for userList
    public void setUserList(List<UserDTO> userList) {
        this.userList = userList;
    }

    // Getter for user
    public UserDTO getUser() {
        return user;
    }

    // Setter for user
    public void setUser(UserDTO user) {
        this.user = user;
    }

    // Getter for userId
    public Long getUserId() {
        return userId;
    }

    // Setter for userId
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Setter for token
    public void setToken(String token) {
        this.token = token;
    }

    // Getter for role
    public String getRole() {
        return role;
    }

    // Setter for role
    public void setRole(String role) {
        this.role = role;
    }

    // Getter for expirationTime
    public String getExpirationTime() {
        return expirationTime;
    }

    // Setter for expirationTime
    public void setExpirationTime(String expirationTime) {
        this.expirationTime = expirationTime;
    }
}

