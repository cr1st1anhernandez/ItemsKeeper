package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.IItemService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collections")
public class CollectionController {

    private final ICollectionService collectionService;
    private final UserRepository userRepository;
    private final IItemService itemService;

    @Autowired
    public CollectionController(ICollectionService collectionService, UserRepository userRepository, IItemService itemService) {
        this.collectionService = collectionService;
        this.userRepository = userRepository;
        this.itemService = itemService;
    }

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

    @PostMapping("/{collectionId}/items")
    public ResponseEntity<ItemDTO> createItem(@PathVariable Long collectionId, @RequestBody ItemDTO itemDTO) {
        itemDTO.setCollectionId(collectionId);
        ItemDTO createdItem = itemService.createItem(itemDTO);
        return ResponseEntity.ok(createdItem);
    }

    @GetMapping("/{collectionId}/items")
    public ResponseEntity<List<ItemDTO>> getItemsByCollectionId(@PathVariable Long collectionId) {
        return ResponseEntity.ok(itemService.getItemsByCollectionId(collectionId));
    }
}
