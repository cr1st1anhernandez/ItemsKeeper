package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
    @Query("SELECT c FROM Collection c LEFT JOIN c.items i GROUP BY c.id ORDER BY COUNT(i.id) DESC")
    List<Collection> findTopCollections(Pageable pageable);

    List<Collection> findByUserId(Long userId);
}
