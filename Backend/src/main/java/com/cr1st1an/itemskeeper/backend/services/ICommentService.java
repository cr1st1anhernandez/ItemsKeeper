package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;

import java.util.List;

public interface ICommentService {
        CommentDTO addComment(CommentDTO commentDTO);
        List<CommentDTO> getCommentsByItemId(Long itemId);
        void deleteComment(Long commentId);
        boolean isLiked(Long commentId, Long userId);
        boolean isDisliked(Long commentId, Long userId);
        void dislikeComment(Long commentId, UserDTO userDTO);
        void undislikeComment(Long commentId, UserDTO userDTO);
        void likeComment(Long commentId, UserDTO userDTO);
        void unlikeComment(Long commentId, UserDTO userDTO);
        int getLikesCount(Long commentId);
        int getDislikesCount(Long commentId);
}
