package com.cr1st1an.itemskeeper.backend.persistence.repositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
    @Query("SELECT c FROM Collection c LEFT JOIN c.items i GROUP BY c.id ORDER BY COUNT(i.id) DESC")
    List<Collection> findTopCollections(Pageable pageable);

    List<Collection> findByUserId(Long userId);

    @Query("SELECT c FROM Collection c WHERE c.category.id = :categoryId")
    List<Collection> findByCategoryId(@Param("categoryId") Long categoryId);

    @Query("SELECT c FROM Collection c WHERE c.name LIKE %:query%")
    List<Collection> searchCollections(@Param("query") String query, Pageable pageable);
}
