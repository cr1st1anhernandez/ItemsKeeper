package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.respositories.CollectionRepository;
import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;

import java.util.List;
import java.util.Optional;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;

@Service
public class CollectionServiceImpl implements ICollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Transactional
    public Collection createCollection(String name, String description, String category, String imageUrl, User user) {
        Collection collection = new Collection();
        collection.setName(name);
        collection.setDescription(description);
        collection.setCategory(category);
        collection.setImage_url(imageUrl);
        collection.setUser(user);
        return collectionRepository.save(collection);
    }

    public List<Collection> getAllCollections() {
        return collectionRepository.findAll();
    }

    public Optional<Collection> getCollectionById(Long collectionId) {
        return collectionRepository.findById(collectionId);
    }

    @Transactional
    public Collection updateCollection(Long collectionId, String name, String description, String category, String imageUrl) {
        Collection collection = collectionRepository.findById(collectionId).orElseThrow(() -> new RuntimeException("Collection not found"));
        collection.setName(name);
        collection.setDescription(description);
        collection.setCategory(category);
        collection.setImage_url(imageUrl);
        return collectionRepository.save(collection);
    }

    @Transactional
    public void deleteCollection(Long collectionId) {
        collectionRepository.deleteById(collectionId);
    }
}
