package com.cr1st1an.itemskeeper.backend.utils;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.*;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ConvertToDTOS {

    public UserDTO convertUserToDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt(), user.isBlocked());
    }

    public CollectionDTO convertCollectionToDTO(Collection collection) {
        String categoryName = collection.getCategory() != null ? collection.getCategory().getName() : null;
        CategoryDTO categoryDTO = new CategoryDTO(categoryName);
        return new CollectionDTO(collection.getId(), collection.getName(), collection.getDescription(), categoryDTO ,collection.getImageUrl(), collection.getUser().getId());
    }

    public ItemDTO convertItemToDTO(Item item) {

        Set<TagDTO> tags = item.getTags().stream()
                .map(tag -> new TagDTO(tag.getName()))
                .collect(Collectors.toSet());
        return new ItemDTO(item.getId(), tags, item.getCollection().getId(), item.getName(), item.getImageUrl(), item.getCreatedAt(), item.getCustomFields());
    }
}
