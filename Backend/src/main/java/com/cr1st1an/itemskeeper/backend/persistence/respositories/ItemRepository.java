package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCollectionId(Long collectionId);

    @Query("SELECT i FROM Item i ORDER BY i.createdAt DESC")
    List<Item> findLastAddedItems(Pageable pageable);
}
