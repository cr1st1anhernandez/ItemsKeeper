package com.cr1st1an.itemskeeper.backend.services.models.validations;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CollectionRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CommentRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.ItemRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ResponseDTO;
import com.cr1st1an.itemskeeper.backend.utils.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Objects;

public class ObjectsValidations {


    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ItemRepository itemRepository;

    public ResponseDTO validateUser(User user) {
        ResponseDTO response = new ResponseDTO();
        response.setNumOfErrors(0);
        if (user.getName() == null || user.getName().isEmpty()) {
            response.setNumOfErrors(1);
            response.setMessage("Name is required");
        } else if (user.getName().length() < 5) {
            response.setNumOfErrors(1);
            response.setMessage("Name must be at least 5 characters");
        } else if (user.getPassword() == null || user.getPassword().isEmpty()) {
            response.setNumOfErrors(1);
            response.setMessage("Password is required");
        } else if (!user.getPassword().matches("^(?=.*[A-Z])(?=.*[\\W_]).{8,}$")) {
            response.setNumOfErrors(1);
            response.setMessage("Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.");
        }
        return response;
    }

    public void validatePassword(String password) {
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        } else if (!password.matches("^(?=.*[A-Z])(?=.*[\\W_]).{8,}$")) {
            throw new IllegalArgumentException("Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.");
        }
    }

    public ResponseEntity<?> validateUserId(HttpServletRequest request, Long userId) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);

            User user = userRepository.findById(userIdFromToken).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(new ResponseDTO(1, "User not found."));
            }
            if (!Objects.equals(userIdFromToken, userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseDTO(1, "You do not have permission to access this resource."));
            }
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ResponseDTO(1, "Invalid request: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(1, "Server internal error: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> validateCollectionId(HttpServletRequest request, Long collectionId) {
        Collection collection = collectionRepository.findById(collectionId).orElse(null);
        if (collection == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO(1, "Collection not found."));
        }
        return validateUserId(request, collection.getUser().getId());
    }

    public ResponseEntity<?> validateCommentId(HttpServletRequest request, Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO(1, "Comment not found."));
        }
        return validateUserId(request, comment.getUser().getId());
    }

    public ResponseEntity<?> validateItemId(HttpServletRequest request, Long itemId) {
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO(1, "Item not found."));
        }
        Collection collection = item.getCollection();
        return validateUserId(request, collection.getUser().getId());
    }
}