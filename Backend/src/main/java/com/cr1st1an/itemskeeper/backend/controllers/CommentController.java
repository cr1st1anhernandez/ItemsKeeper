package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import com.cr1st1an.itemskeeper.backend.services.models.validations.ObjectsValidations;
import com.cr1st1an.itemskeeper.backend.utils.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    private final ICommentService commentService;
    private final ObjectsValidations objectsValidations;
    private final JWTUtils jwtUtils;

    @Autowired
    public CommentController(ICommentService commentService, ObjectsValidations objectsValidations, JWTUtils jwtUtils) {
        this.objectsValidations = objectsValidations;
        this.jwtUtils = jwtUtils;
        this.commentService = commentService;
    }

    @PostMapping("/{commentId}/{action}")
    public ResponseEntity<Void> handleCommentAction(
            @PathVariable Long commentId,
            @PathVariable String action,
            @RequestBody UserDTO userDTO) {
        switch (action) {
            case "like" -> commentService.likeComment(commentId, userDTO);
            case "unlike" -> commentService.unlikeComment(commentId, userDTO);
            case "dislike" -> commentService.dislikeComment(commentId, userDTO);
            case "undislike" -> commentService.undislikeComment(commentId, userDTO);
            default -> throw new IllegalArgumentException("Invalid action");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{commentId}/status/{type}")
    public ResponseEntity<Boolean> getCommentStatus(
            @PathVariable Long commentId,
            @PathVariable String type,
            @RequestParam Long userId) {
        boolean result = switch (type) {
            case "liked" -> commentService.isLiked(commentId, userId);
            case "disliked" -> commentService.isDisliked(commentId, userId);
            default -> throw new IllegalArgumentException("Invalid status type");
        };
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{commentId}/{type}/count")
    public ResponseEntity<Integer> getReactionCount(
            @PathVariable Long commentId,
            @PathVariable String type) {
        int count = switch (type) {
            case "likes" -> commentService.getLikesCount(commentId);
            case "dislikes" -> commentService.getDislikesCount(commentId);
            default -> throw new IllegalArgumentException("Invalid count type");
        };
        return ResponseEntity.ok(count);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        try {
            String token = jwtUtils.extractToken(request);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);
            commentDTO.setUserId(userIdFromToken);
            CommentDTO comment = commentService.addComment(commentDTO);
            return ResponseEntity.ok(comment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, HttpServletRequest request) {
        ResponseEntity<?> validationResponse = objectsValidations.validateCommentId(request, commentId);
        if (validationResponse.getStatusCode().isError()) {
            return validationResponse;
        }

        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByItemId(@PathVariable Long itemId) {
        return ResponseEntity.ok(commentService.getCommentsByItemId(itemId));
    }
}
