package com.cr1st1an.itemskeeper.backend.utils;

import com.cr1st1an.itemskeeper.backend.persistence.entities.*;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.*;
import org.springframework.stereotype.Component;
import java.util.List;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ConvertToDTOS {

    public UserDTO convertUserToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setBlocked(user.isBlocked());
        userDTO.setRole(user.getRole().getName());
        return userDTO;
    }

    public List<CommentDTO> convertCommentsToDTO(Set<Comment> comments) {
        return comments.stream()
                .map(this::convertCommentToDTO)
                .collect(Collectors.toList());
    }

    public CommentDTO convertCommentToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setText(comment.getText());
        commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setItemId(comment.getItem().getId());
        commentDTO.setAuthor(comment.getUser().getName());
        return commentDTO;
    }

    public CategoryDTO convertCategoryToDTO(Category category) {
        return new CategoryDTO(category.getName());
    }

    public List<CollectionDTO> convertCollectionsToDTO(Set<Collection> collections) {
        return collections.stream()
                .map(this::convertCollectionToDTO)
                .collect(Collectors.toList());
    }

    public CollectionDTO convertCollectionToDTO(Collection collection) {
        String categoryName = collection.getCategory() != null ? collection.getCategory().getName() : null;
        CollectionDTO collectionDTO = new CollectionDTO();
        collectionDTO.setId(collection.getId());
        collectionDTO.setName(collection.getName());
        collectionDTO.setDescription(collection.getDescription());
        collectionDTO.setCategory(categoryName);
        collectionDTO.setImageUrl(collection.getImageUrl());
        collectionDTO.setUserId(collection.getUser().getId());
        collectionDTO.setItemCount(collection.getItems().size());
        collectionDTO.setCreatorName(collection.getUser().getName());
        return collectionDTO;
    }

    public TagDTO convertTagToDTO(Tag tag) {
        return new TagDTO(tag.getName());
    }

    public ItemDTO convertItemToDTO(Item item) {

        Set<TagDTO> tags = item.getTags().stream()
                .map(tag -> new TagDTO(tag.getName()))
                .collect(Collectors.toSet());
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setId(item.getId());
        itemDTO.setName(item.getName());
        itemDTO.setTags(tags);
        itemDTO.setCreatedAt(item.getCreatedAt());
        itemDTO.setCustomFields(item.getCustomFields());
        itemDTO.setImageUrl(item.getImageUrl());
        itemDTO.setCollectionId(item.getCollection().getId());
        itemDTO.setCreatorName(item.getCollection().getUser().getName());
        itemDTO.setCollectionName(item.getCollection().getName());
        return itemDTO;
    }
}
