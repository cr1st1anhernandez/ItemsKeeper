package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByItemId(Long itemId);
}
