package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CommentRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.ItemRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CommentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements ICommentService {

    private final CommentRepository commentRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, ItemRepository itemRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CommentDTO addComment(Long itemId, CommentDTO commentDTO) {
        Long userId = commentDTO.getUserId();
        String text = commentDTO.getText();
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Comment comment = new Comment();
        comment.setText(text);
        comment.setItem(item);
        comment.setUser(user);
        comment = commentRepository.save(comment);
        return new CommentDTO(comment.getId(), comment.getText(), comment.getUser().getId(), comment.getItem().getId());

    }

    @Transactional
    public List<CommentDTO> getCommentsByItemId(Long itemId) {
        List<Comment> comments = commentRepository.findByItemId(itemId);
        return comments.stream()
                .map(comment -> new CommentDTO(comment.getId(), comment.getText(), comment.getUser().getId(), comment.getItem().getId()))
                .collect(java.util.stream.Collectors.toList());
    }
}
