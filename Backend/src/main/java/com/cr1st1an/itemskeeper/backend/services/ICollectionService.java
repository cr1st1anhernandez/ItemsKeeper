package com.cr1st1an.itemskeeper.backend.services;

import java.util.List;
import java.util.Optional;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;

public interface ICollectionService {
    public Collection createCollection(String name, String description, String category, String imageUrl, User user);
    public List<Collection> getAllCollections();
    public Optional<Collection> getCollectionById(Long collectionId);
    public Collection updateCollection(Long collectionId, String name, String description, String category, String imageUrl);
    public void deleteCollection(Long collectionId);
}
