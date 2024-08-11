package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCollectionId(Long collectionId);
}
