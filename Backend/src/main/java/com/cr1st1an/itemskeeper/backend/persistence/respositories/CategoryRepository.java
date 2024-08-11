package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}
