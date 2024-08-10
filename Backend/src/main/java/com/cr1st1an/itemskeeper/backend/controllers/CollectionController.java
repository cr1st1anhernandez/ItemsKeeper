package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collections")
public class CollectionController {

    @Autowired
    private ICollectionService collectionService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<CollectionDTO> createCollection(@RequestBody CollectionDTO collectionDTO) {
        User user = userRepository.findById(collectionDTO.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        CollectionDTO collection = collectionService.createCollection(collectionDTO);
        return ResponseEntity.ok(collection);
    }

    @GetMapping
    public ResponseEntity<List<CollectionDTO>> getAllCollections() {
        return ResponseEntity.ok(collectionService.getAllCollections());
    }

    @GetMapping("/{collectionId}")
    public ResponseEntity<CollectionDTO> getCollectionById(@PathVariable Long collectionId) {
        return collectionService.getCollectionById(collectionId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<CollectionDTO> updateCollection(
            @PathVariable Long collectionId,
            @RequestBody CollectionDTO collectionDTO
    ) {
        CollectionDTO updatedCollection = collectionService.updateCollection(collectionId, collectionDTO);
        return ResponseEntity.ok(updatedCollection);
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long collectionId) {
        collectionService.deleteCollection(collectionId);
        return ResponseEntity.noContent().build();
    }
}
