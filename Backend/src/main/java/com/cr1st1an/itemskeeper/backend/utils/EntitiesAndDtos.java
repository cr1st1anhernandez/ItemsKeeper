package com.cr1st1an.itemskeeper.backend.utils;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class EntitiesAndDtos {

    public UserDTO convertToDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt(), user.isActive());
    }
}
