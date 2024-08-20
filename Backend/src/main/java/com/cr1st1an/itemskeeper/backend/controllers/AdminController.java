package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.impl.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminServiceImpl adminService;

    @Autowired
    public AdminController(AdminServiceImpl adminService) {
        this.adminService = adminService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/assign-role")
    public ResponseEntity<?> assignRole(@RequestParam Long userId, @RequestParam String roleName) {
        String result = adminService.assignRole(userId, roleName);
        if (result.equals("Role assigned successfully")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove-role")
    public ResponseEntity<?> removeRole(@RequestParam Long userId, @RequestParam String roleName) {
        String result = adminService.removeRole(userId, roleName);
        if (result.equals("Role removed successfully")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        Iterable<User> users = adminService.getUsers();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/block/{userId}")
    public ResponseEntity<?> blockUser(@PathVariable Long userId) {
        String result = adminService.blockUser(userId);
        if (result.equals("User blocked successfully")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/unblock/{userId}")
    public ResponseEntity<?> unblockUser(@PathVariable Long userId) {
        String result = adminService.unblockUser(userId);
        if (result.equals("User unblocked successfully")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }}

