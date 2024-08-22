package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
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

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
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
