package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;

import java.util.List;

public interface ICommentService {
        CommentDTO addComment(CommentDTO commentDTO);
        List<CommentDTO> getCommentsByItemId(Long itemId);
        void deleteComment(Long commentId);
}
