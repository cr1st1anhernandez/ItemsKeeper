package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import com.cr1st1an.itemskeeper.backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;

import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final ConvertToDTOS convertToDTOS;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.convertToDTOS = new ConvertToDTOS();
    }

    public UserDTO getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(convertToDTOS::convertUserToDTO).orElse(null);
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
            return convertToDTOS.convertUserToDTO(existingUser);
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
