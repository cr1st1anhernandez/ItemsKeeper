package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CommentRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.ItemRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Comment addComment(Long itemId, Long userId, String content) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setText(content);
        comment.setItem(item);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByItemId(Long itemId) {
        return commentRepository.findByItemId(itemId);
    }
}
