package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import com.cr1st1an.itemskeeper.backend.services.IUserService;
import com.cr1st1an.itemskeeper.backend.services.models.validations.ObjectsValidations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final ConvertToDTOS convertToDTOS;
    private final ObjectsValidations objectsValidations;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ConvertToDTOS convertToDTOS, ObjectsValidations objectsValidations) {
        this.userRepository = userRepository;
        this.convertToDTOS = convertToDTOS;
        this.objectsValidations = objectsValidations;
    }

    public void changePassword(Long userId, String newPassword) {
        objectsValidations.validatePassword(newPassword);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            user.get().setPassword(encoder.encode(newPassword));
            userRepository.save(user.get());
        } else {
            throw new IllegalArgumentException("User not found!");
        }
    }

    public UserDTO getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(convertToDTOS::convertUserToDTO).orElse(null);
    }

    @Transactional
    public List<CollectionDTO> getUserCollections(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(u -> convertToDTOS.convertCollectionsToDTO(u.getCollections())).orElse(null);
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
