package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items/{itemId}/comments")
public class CommentController {

    private final ICommentService commentService;

    @Autowired
    public CommentController(ICommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(@PathVariable Long itemId, @RequestBody CommentDTO commentDTO) {
        CommentDTO comment = commentService.addComment(itemId, commentDTO);
        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getCommentsByItemId(@PathVariable Long itemId) {
        return ResponseEntity.ok(commentService.getCommentsByItemId(itemId));
    }
}
