package com.cr1st1an.itemskeeper.backend.services;

import java.util.List;
import java.util.Optional;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;

public interface ICollectionService {
    public CollectionDTO createCollection(CollectionDTO collectionDTO);
    public List<CollectionDTO> getAllCollections();
    public Optional<CollectionDTO> getCollectionById(Long collectionId);
    public CollectionDTO updateCollection(Long collectionId,CollectionDTO collectionDTO);
    public void deleteCollection(Long collectionId);
}
