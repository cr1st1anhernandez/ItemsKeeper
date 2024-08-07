package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;

import java.util.List;

public interface ICommentService {
        public Comment addComment(Long itemId, Long userId, String content);
        public List<Comment> getCommentsByItemId(Long itemId);
}
