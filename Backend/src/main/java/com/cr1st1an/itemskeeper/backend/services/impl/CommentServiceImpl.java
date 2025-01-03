package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.repositories.CommentRepository;
import com.cr1st1an.itemskeeper.backend.persistence.repositories.ItemRepository;
import com.cr1st1an.itemskeeper.backend.persistence.repositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.UserDTO;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;
import org.springframework.beans.factory.annotation.Autowired;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements ICommentService {

    private final CommentRepository commentRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ConvertToDTOS convertToDTOS;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, ItemRepository itemRepository, UserRepository userRepository, ConvertToDTOS convertToDTOS) {
        this.convertToDTOS = convertToDTOS;
        this.commentRepository = commentRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public CommentDTO addComment(CommentDTO commentDTO) {
        Long userId = commentDTO.getUserId();
        String text = commentDTO.getText();
        Item item = itemRepository.findById(commentDTO.getItemId()).orElseThrow(() -> new RuntimeException("Item not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Comment comment = new Comment();
        comment.setText(text);
        comment.setItem(item);
        comment.setUser(user);
        comment = commentRepository.save(comment);
        return(convertToDTOS.convertCommentToDTO(comment));
    }

    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }

    private Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @Transactional
    public List<CommentDTO> getCommentsByItemId(Long itemId) {
        List<Comment> comments = commentRepository.findByItemId(itemId);
        return comments.stream()
                .map(convertToDTOS::convertCommentToDTO)
                .collect(java.util.stream.Collectors.toList());
    }

    public boolean isLiked(Long commentId, Long userId) {
        Comment comment = getCommentById(commentId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return comment.getLikes().contains(user);
    }

    public boolean isDisliked(Long commentId, Long userId) {
        Comment comment = getCommentById(commentId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return comment.getDislikes().contains(user);
    }

    public void likeComment(Long commentId, UserDTO userDTO) {
        Comment comment = getCommentById(commentId);
        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.addLike(user);
        commentRepository.save(comment);
    }

    public void unlikeComment(Long commentId, UserDTO userDTO) {
        Comment comment = getCommentById(commentId);
        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.removeLike(user);
        commentRepository.save(comment);
    }

    public void dislikeComment(Long commentId, UserDTO userDTO) {
        Comment comment = getCommentById(commentId);
        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.addDislike(user);
        commentRepository.save(comment);
    }

    public void undislikeComment(Long commentId, UserDTO userDTO) {
        Comment comment = getCommentById(commentId);
        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.removeDislike(user);
        commentRepository.save(comment);
    }

    public int getLikesCount(Long commentId) {
        Comment comment = getCommentById(commentId);
        return comment.getLikesCount();
    }

    public int getDislikesCount(Long commentId) {
        Comment comment = getCommentById(commentId);
        return comment.getDislikesCount();
    }
}
