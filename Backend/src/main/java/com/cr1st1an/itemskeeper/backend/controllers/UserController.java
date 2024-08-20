package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.IUserService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import com.cr1st1an.itemskeeper.backend.utils.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final IUserService userService;
    private final JWTUtils jwtUtils;

    @Autowired
    public UserController(IUserService userService, JWTUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);

            if (!userId.equals(userIdFromToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            UserDTO updatedUser = userService.updateUser(userId, userDTO);
            return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/account")
    public ResponseEntity<Void> deleteUser(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);

            boolean isDeleted = userService.deleteUser(userIdFromToken);
            return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{userId}/collections")
    public ResponseEntity<List<CollectionDTO>> getUserCollections(@PathVariable Long userId, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);

            if (!userId.equals(userIdFromToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            List<CollectionDTO> collections = userService.getUserCollections(userId);
            return ResponseEntity.ok(collections);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{userId}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long userId, @RequestBody String newPassword, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);

            if (!userId.equals(userIdFromToken)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para cambiar la contraseña.");
            }

            userService.changePassword(userId, newPassword);
            return ResponseEntity.ok("Password changed successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while changing the password.");
        }
    }
}
