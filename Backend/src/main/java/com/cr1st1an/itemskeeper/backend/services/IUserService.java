package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<CollectionDTO> getUserCollections(Long userId);
    UserDTO getUserById(Long userId);
    UserDTO updateUser(Long userId, UserDTO userDTO);
    boolean deleteUser(Long userId);
    void changePassword(Long userId, String newPassword);
    void changeImageProfile(Long userId, String imageUrl);
}
