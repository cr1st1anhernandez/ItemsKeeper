package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Role;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.RoleRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements IAdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private Optional<User> findUserByName(String username) {
        return userRepository.findByName(username);
    }

    private Optional<Role> findRoleByName(String roleName) {
        return roleRepository.findByName(roleName);
    }

    public String assignRole(String username, String roleName) {
        Optional<User> userOptional = findUserByName(username);
        if (userOptional.isEmpty()) {
            return "User not found";
        }

        Optional<Role> roleOptional = findRoleByName(roleName);
        if (roleOptional.isEmpty()) {
            return "Role not found";
        }

        User user = userOptional.get();
        Role role = roleOptional.get();
        user.setRole(role);
        userRepository.save(user);

        return "Role assigned successfully";
    }

    public String removeRole(String username, String roleName) {
        Optional<User> userOptional = findUserByName(username);
        if (userOptional.isEmpty()) {
            return "User not found";
        }

        Optional<Role> roleOptional = findRoleByName(roleName);
        if (roleOptional.isEmpty()) {
            return "Role not found";
        }

        User user = userOptional.get();
        Role role = roleOptional.get();
        user.setRole(role);
        userRepository.save(user);

        return "Role removed successfully";
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public String blockUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return "User not found";
        }

        User user = userOptional.get();
        user.setBlocked(true);
        userRepository.save(user);

        return "User blocked successfully";
    }

    public String unblockUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return "User not found";
        }

        User user = userOptional.get();
        user.setBlocked(false);
        userRepository.save(user);

        return "User unblocked successfully";
    }
}
