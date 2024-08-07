package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.UserRepository;
import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collections")
public class CollectionController {

    @Autowired
    private ICollectionService collectionService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IUserService userService;

    @PostMapping
    public ResponseEntity<Collection> createCollection(@RequestParam String name, @RequestParam String description, @RequestParam String category, @RequestParam String imageUrl, @RequestParam Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            return ResponseEntity.badRequest().build();
        }
        Collection collection = collectionService.createCollection(name, description, category, imageUrl, user);
        return ResponseEntity.ok(collection);
    }

    @GetMapping
    public ResponseEntity<List<Collection>> getAllCollections() {
        return ResponseEntity.ok(collectionService.getAllCollections());
    }

    @GetMapping("/{collectionId}")
    public ResponseEntity<Collection> getCollectionById(@PathVariable Long collectionId) {
        return collectionService.getCollectionById(collectionId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<Collection> updateCollection(@PathVariable Long collectionId, @RequestParam String name, @RequestParam String description, @RequestParam String category, @RequestParam String imageUrl) {
        Collection collection = collectionService.updateCollection(collectionId, name, description, category, imageUrl);
        return ResponseEntity.ok(collection);
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long collectionId) {
        collectionService.deleteCollection(collectionId);
        return ResponseEntity.noContent().build();
    }
}
