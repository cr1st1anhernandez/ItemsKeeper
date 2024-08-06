package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
}
