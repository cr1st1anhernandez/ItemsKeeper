package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.IItemService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;
import com.cr1st1an.itemskeeper.backend.services.models.validations.ObjectsValidations;
import com.cr1st1an.itemskeeper.backend.utils.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/collections")
public class CollectionController {

    private final ICollectionService collectionService;
    private final IItemService itemService;
    private final JWTUtils jwtUtils;
    private final ObjectsValidations objectsValidations;

    @Autowired
    public CollectionController(ICollectionService collectionService, IItemService itemService, JWTUtils jwtUtils, ObjectsValidations objectsValidations) {
        this.collectionService = collectionService;
        this.itemService = itemService;
        this.jwtUtils = jwtUtils;
        this.objectsValidations = objectsValidations;
    }

    @GetMapping("/top")
    public ResponseEntity<List<CollectionDTO>> getTopCollections() {
        List<CollectionDTO> topCollections = collectionService.getTopCollections();
        return ResponseEntity.ok(topCollections);
    }

    @GetMapping("/{collectionId}/items")
    public ResponseEntity<List<ItemDTO>> getItemsByCollectionId(@PathVariable Long collectionId) {
        return ResponseEntity.ok(itemService.getItemsByCollectionId(collectionId));
    }

    @GetMapping
    public ResponseEntity<List<CollectionDTO>> getAllCollections() {
        return ResponseEntity.ok(collectionService.getAllCollections());
    }

    @GetMapping("/{collectionId}")
    public ResponseEntity<CollectionDTO> getCollectionById(@PathVariable Long collectionId) {
        return collectionService.getCollectionById(collectionId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CollectionDTO> createCollection(@RequestBody CollectionDTO collectionDTO, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);
            collectionDTO.setUserId(userIdFromToken);
            CollectionDTO collection = collectionService.createCollection(collectionDTO);
            return ResponseEntity.ok(collection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateCollection(@RequestBody CollectionDTO collectionDTO, HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Long userIdFromToken = jwtUtils.getUserIdFromJWT(token);
            collectionDTO.setUserId(userIdFromToken);
            CollectionDTO updatedCollection = collectionService.updateCollection(collectionDTO);
            return ResponseEntity.ok(updatedCollection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<?> deleteCollection(@PathVariable Long collectionId, HttpServletRequest request) {
        ResponseEntity<?> validationResponse = objectsValidations.validateCollectionId(request, collectionId);
        if (validationResponse.getStatusCode().isError()) {
            return validationResponse;
        }

        collectionService.deleteCollection(collectionId);
        return ResponseEntity.noContent().build();
    }
}

