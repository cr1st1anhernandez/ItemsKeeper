package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;

import java.util.List;

public interface ICommentService {
        public CommentDTO addComment(Long itemId, CommentDTO commentDTO);
        public List<CommentDTO> getCommentsByItemId(Long itemId);
}
