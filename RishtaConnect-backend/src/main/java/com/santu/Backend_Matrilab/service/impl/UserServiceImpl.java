package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.LoginRequest;
import com.santu.Backend_Matrilab.dto.response.Response;
import com.santu.Backend_Matrilab.dto.UserDTO;
import com.santu.Backend_Matrilab.entities.PurchaseHistory;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.exception.OurException;
import com.santu.Backend_Matrilab.repository.PurchaseHistoryRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.IUserService;
import com.santu.Backend_Matrilab.utils.JWTUtils;
import com.santu.Backend_Matrilab.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    @Override
    public Response register(User user) {
        Response response = new Response();

        try {
            // Validation checks
            if (user.getFirstName() == null || user.getFirstName().trim().isEmpty()) {
                throw new OurException("First name is required");
            }
            if (user.getLastName() == null || user.getLastName().trim().isEmpty()) {
                throw new OurException("Last name is required");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                throw new OurException("Email is required");
            }
            if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
                throw new OurException("Invalid email format");
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                throw new OurException("Password is required");
            }
            if (user.getPassword().length() < 6) {
                throw new OurException("Password must be at least 6 characters long");
            }
            if (user.getConfirmPassword() == null || user.getConfirmPassword().trim().isEmpty()) {
                throw new OurException("Confirm password is required");
            }
            if (!user.getPassword().equals(user.getConfirmPassword())) {
                throw new OurException("Passwords do not match. Please try again.");
            }

            // Set default role if not provided
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }

            // Check if email already exists
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException("Email " + user.getEmail() + " already exists");
            }

            // Encode password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            // Clear confirmPassword as it's transient and shouldn't be persisted
            user.setConfirmPassword(null);

            User savedUser = userRepository.save(user);
            
            // Create free package for new user
            createFreePackageForUser(savedUser);
            
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

            response.setStatusCode(200);
            response.setMessage("Registration successful");
            response.setUser(userDTO);
            response.setUserId(userDTO.getId());
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user registration: " + e.getMessage());
        }

        return response;
    }

    @Override
    @Transactional
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();

        try {
            // Validation checks
            if (loginRequest.getEmail() == null || loginRequest.getEmail().trim().isEmpty()) {
                throw new OurException("Email is required");
            }
            if (loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
                throw new OurException("Password is required");
            }

            // Authenticate user
            try {
                authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                    )
                );
            } catch (BadCredentialsException e) {
                throw new OurException("Invalid email or password");
            }

            User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new OurException("User not found"));

            // Check if account is enabled
            if (!user.isEnabled()) {
                throw new OurException("Account is disabled");
            }
            if (!user.isAccountNonLocked()) {
                throw new OurException("Account is locked");
            }

            // Check if user has any package, if not create free package
            System.out.println("Checking if user " + user.getId() + " has package...");
            boolean hasPackage = purchaseHistoryRepository.existsByUser_IdAndStatus(user.getId(), "COMPLETED");
            System.out.println("User has package: " + hasPackage);
            
            if (!hasPackage) {
                System.out.println("Creating free package for user " + user.getId());
                createFreePackageForUser(user);
            }

            String token = jwtUtils.generateToken(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setStatusCode(200);
            response.setMessage("Login successful");
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setUser(userDTO);
            response.setUserId(userDTO.getId());
        } catch (OurException e) {
            response.setStatusCode(401);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user login: " + e.getMessage());
        }

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public Response getUserById(String userId) {
        Response response = new Response();

        try {
            if (userId == null || userId.trim().isEmpty()) {
                throw new OurException("User ID is required");
            }

            User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setStatusCode(200);
            response.setMessage("User fetched successfully");
            response.setUser(userDTO);
            response.setUserId(user.getId());
        } catch (NumberFormatException e) {
            response.setStatusCode(400);
            response.setMessage("Invalid user ID format");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching user by ID: " + e.getMessage());
        }

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public Response getMyInfo(String email) {
        Response response = new Response();

        try {
            if (email == null || email.trim().isEmpty()) {
                throw new OurException("Email is required");
            }

            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setStatusCode(200);
            response.setMessage("User information fetched successfully");
            response.setUser(userDTO);
            response.setUserId(user.getId());
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching user information: " + e.getMessage());
        }

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return users.stream()
                .map(Utils::mapUserEntityToUserDTO)
                .toList();
        } catch (Exception e) {
            throw new OurException("Failed to fetch user list: " + e.getMessage());
        }
    }

    /**
     * Creates a free package for newly registered users
     * Free package includes 10 profile views limit per month
     */
    @Transactional
    private void createFreePackageForUser(User user) {
        try {
            System.out.println("Creating free package for user ID: " + user.getId());
            
            PurchaseHistory freePackage = new PurchaseHistory();
            freePackage.setUser(user);
            freePackage.setPackageName("Free");
            freePackage.setPrice(0.0);
            freePackage.setValidityPeriod("30 days");
            freePackage.setPurchaseDate(LocalDate.now()); // First login date
            freePackage.setStatus("COMPLETED");
            freePackage.setProfileViewLimit(10); // Free users can view 10 profiles per month
            freePackage.setProfileViewCount(0); // Initialize view count to 0
            
            PurchaseHistory savedPackage = purchaseHistoryRepository.save(freePackage);
            System.out.println("Free package created successfully with ID: " + savedPackage.getId());
        } catch (Exception e) {
            // Log the error but don't fail registration
            System.err.println("Failed to create free package for user " + user.getId() + ": " + e.getMessage());
            e.printStackTrace();
        }
    }

}
