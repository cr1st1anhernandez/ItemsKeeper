package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.IAuthService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.LoginDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.LoginResponseDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final IAuthService authService;

    @Autowired
    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    private ResponseEntity<ResponseDTO> addUser(@RequestBody User user) throws Exception {
        return new ResponseEntity<>(authService.register(user), HttpStatus.OK);
    }

    @PostMapping("/login")
    private ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginRequest) throws Exception {
        LoginResponseDTO login = authService.login(loginRequest);
        return new ResponseEntity<>(login, HttpStatus.OK);
    }
}
