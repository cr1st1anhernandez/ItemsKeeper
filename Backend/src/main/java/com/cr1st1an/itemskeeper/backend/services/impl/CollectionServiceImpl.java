package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Category;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CategoryRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CollectionRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;

@Service
public class CollectionServiceImpl implements ICollectionService {

    private final ConvertToDTOS convertToDTOS;
    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public CollectionServiceImpl(CollectionRepository collectionRepository, UserRepository userRepository, CategoryRepository categoryRepository, ConvertToDTOS convertToDTOS) {
        this.collectionRepository = collectionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.convertToDTOS = convertToDTOS;
    }

    @Transactional
    public List<CollectionDTO> getTopCollections() {
        Pageable pageable = PageRequest.of(0, 5);
        return collectionRepository.findTopCollections(pageable)
                .stream()
                .map(convertToDTOS::convertCollectionToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CollectionDTO createCollection(CollectionDTO collectionDTO) {
        User user = userRepository.findById(collectionDTO.getUserId()).orElse(null);
        Category category = categoryRepository.findByName(collectionDTO.getCategory()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        } else if (category == null) {
            throw new RuntimeException("Category not found");
        }
        Collection collection = new Collection();
        collection.setName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());
        collection.setUser(user);
        collection.setCategory(category);
        collection.setImageUrl(collectionDTO.getImageUrl());
        Collection savedCollection = collectionRepository.save(collection);
        return convertToDTOS.convertCollectionToDTO(savedCollection);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CollectionDTO> getAllCollections() {
        List<Collection> collections = collectionRepository.findAll();
        collections.forEach(collection -> Hibernate.initialize(collection.getCategory()));
        return collections.stream()
                .map(convertToDTOS::convertCollectionToDTO)
                .collect(Collectors.toList());
    }


    @Transactional
    public Optional<CollectionDTO> getCollectionById(Long collectionId) {
        return collectionRepository.findById(collectionId).map(convertToDTOS::convertCollectionToDTO);
    }

    @Transactional
    public CollectionDTO updateCollection(Long collectionId, CollectionDTO collectionDTO) {
        Collection collection = collectionRepository.findById(collectionId).orElseThrow(() -> new RuntimeException("Collection not found"));
        Category category = categoryRepository.findByName(collectionDTO.getCategory()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        } else if (!collectionDTO.getUserId().equals(collection.getUser().getId())) {
            throw new RuntimeException("User not found");
        } else if (!collectionDTO.getCategory().equals(collection.getCategory().getName())) {
            throw new RuntimeException("Category not found");
        }
        collection.setName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());
        collection.setCategory(category);
        collection.setImageUrl(collectionDTO.getImageUrl());
        Collection savedCollection = collectionRepository.save(collection);
        return convertToDTOS.convertCollectionToDTO(savedCollection);
    }

    @Transactional
    public void deleteCollection(Long collectionId) {
        collectionRepository.deleteById(collectionId);
    }
}
