package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
import com.cr1st1an.itemskeeper.backend.services.models.validations.ObjectsValidations;
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

    @Autowired
    public CommentController(ICommentService commentService, ObjectsValidations objectsValidations) {
        this.objectsValidations = objectsValidations;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        ResponseEntity<?> validationResponse = objectsValidations.validateUserId(request, commentDTO.getUserId());
        if (validationResponse.getStatusCode().isError()) {
            return validationResponse;
        }

        CommentDTO comment = commentService.addComment(commentDTO);
        return ResponseEntity.ok(comment);
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
