package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.respositories.CollectionRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.utils.EntitiesAndDtos;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;

@Service
public class CollectionServiceImpl implements ICollectionService {

    EntitiesAndDtos entitiesAndDtos = new EntitiesAndDtos();

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CollectionDTO createCollection(CollectionDTO collectionDTO) {
        User user = userRepository.findById(collectionDTO.getUserId()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        Collection collection = new Collection();
        collection.setName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());
        collection.setCategory(collectionDTO.getCategory());
        collection.setImageUrl(collectionDTO.getImageUrl());
        collection.setUser(user);

        Collection savedCollection = collectionRepository.save(collection);
        return entitiesAndDtos.convertCollectionToDTO(savedCollection);
    }

    @Override
    public List<CollectionDTO> getAllCollections() {
        return collectionRepository.findAll().stream()
                .map(entitiesAndDtos::convertCollectionToDTO)
                .collect(Collectors.toList());
    }

    public Optional<CollectionDTO> getCollectionById(Long collectionId) {
        return collectionRepository.findById(collectionId).map(entitiesAndDtos::convertCollectionToDTO);
    }

    @Transactional
    public CollectionDTO updateCollection(Long collectionId, CollectionDTO collectionDTO) {
        Collection collection = collectionRepository.findById(collectionId).orElseThrow(() -> new RuntimeException("Collection not found"));
        collection.setName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());
        collection.setCategory(collectionDTO.getCategory());
        collection.setImageUrl(collectionDTO.getImageUrl());
        Collection savedCollection = collectionRepository.save(collection);
        return entitiesAndDtos.convertCollectionToDTO(savedCollection);
    }

    @Transactional
    public void deleteCollection(Long collectionId) {
        collectionRepository.deleteById(collectionId);
    }
}
