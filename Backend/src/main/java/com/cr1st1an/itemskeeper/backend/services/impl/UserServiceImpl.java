package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import com.cr1st1an.itemskeeper.backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cr1st1an.itemskeeper.backend.utils.EntitiesAndDtos;

import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    EntitiesAndDtos entitiesAndDtos;

    public UserDTO getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(entitiesAndDtos::convertToDTO).orElse(null);
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        Optional<User> existingUserOptional = userRepository.findById(userId);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            existingUser.setName(userDTO.getName());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setBlocked(userDTO.isBlocked());
            existingUser.setCreatedAt(userDTO.getCreatedAt());

            userRepository.save(existingUser);
            return entitiesAndDtos.convertToDTO(existingUser);
        }
        return null;
    }
    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
