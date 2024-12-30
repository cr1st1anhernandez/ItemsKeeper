package com.cr1st1an.itemskeeper.backend.services;

import java.util.List;
import java.util.Optional;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;

public interface ICollectionService {
    CollectionDTO createCollection(CollectionDTO collectionDTO);
    List<CollectionDTO> getTopCollections();
    List<CollectionDTO> getAllCollections();
    Optional<CollectionDTO> getCollectionById(Long collectionId);
    CollectionDTO updateCollection(CollectionDTO collectionDTO);
    void deleteCollection(Long collectionId);
    List<CollectionDTO> getUserCollections(Long userId);
    List<CollectionDTO> getCollectionsByCategoryId(Long categoryId);
}
