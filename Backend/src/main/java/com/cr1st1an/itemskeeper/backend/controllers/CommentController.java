package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items/{itemId}/comments")
public class CommentController {

    @Autowired
    private ICommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> addComment(@PathVariable Long itemId, @RequestParam Long userId, @RequestParam String content) {
        Comment comment = commentService.addComment(itemId, userId, content);
        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getCommentsByItemId(@PathVariable Long itemId) {
        return ResponseEntity.ok(commentService.getCommentsByItemId(itemId));
    }
}
