package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Role;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.RoleRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.LoginDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.LoginResponseDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ResponseDTO;
import com.cr1st1an.itemskeeper.backend.services.models.validations.UserValidations;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.IAuthService;
import com.cr1st1an.itemskeeper.backend.services.IJWTUtilityService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;
    private final IJWTUtilityService jwtUtilityService;
    private final UserValidations userValidations;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, IJWTUtilityService jwtUtilityService, UserValidations userValidations, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.jwtUtilityService = jwtUtilityService;
        this.userValidations = userValidations;
        this.roleRepository = roleRepository;
    }

    @Override
    public LoginResponseDTO login(LoginDTO loginRequest) throws Exception {
        try {
            LoginResponseDTO responseDTO = new LoginResponseDTO();
            Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

            if (user.isEmpty()) {
                responseDTO.setError("User not registered!");
                return responseDTO;
            }
            Long userId = user.get().getId();
            Optional<Boolean> isUserBlocked = userRepository.isUserBlocked(user.get().getId());
            if (isUserBlocked.orElse(false)) {
                responseDTO.setError("User is blocked!");
                return responseDTO;
            }
            if (verifyPassword(loginRequest.getPassword(), user.get().getPassword())) {
                responseDTO.setJwt(jwtUtilityService.generateJWT(user.get().getId()));
                responseDTO.setUserId(user.get().getId());
                responseDTO.setError(null);
            } else {
                responseDTO.setError("Invalid Credentials!");
            }
            return responseDTO;
        } catch (IllegalArgumentException e) {
            System.err.println("Error generating JWT: " + e.getMessage());
            throw new Exception("Error generating JWT", e);
        } catch (Exception e) {
            System.err.println("Unknown error: " + e.toString());
            throw new Exception("Unknown error", e);
        }
    }

    @Override
    @Transactional
    public ResponseDTO register(User user) throws Exception {
        try {
            ResponseDTO response = userValidations.validate(user);

            if (response.getNumOfErrors() > 0){
                return response;
            }

            Optional<User> existingUserByName = userRepository.findByName(user.getName());
            if (existingUserByName.isPresent()) {
                response.setMessage("User already exists!");
                return response;
            }

            Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());
            if (existingUserByEmail.isPresent()) {
                response.setMessage("Email already register!");
                return response;
            }

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            user.setPassword(encoder.encode(user.getPassword()));
            Role userRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            user.setRole(userRole);
            userRepository.save(user);
            response.setMessage("User created successfully!");
            return response;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private boolean verifyPassword(String enteredPassword, String storedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(enteredPassword, storedPassword);
    }
}
