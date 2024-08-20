package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.IItemService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;
import com.cr1st1an.itemskeeper.backend.services.models.validations.ObjectsValidations;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {

    private final IItemService itemService;
    private final ObjectsValidations objectsValidations;

    @Autowired
    public ItemController(IItemService itemService, ObjectsValidations objectsValidations) {
        this.itemService = itemService;
        this.objectsValidations = objectsValidations;
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ItemDTO>> getLastAddedItems() {
        List<ItemDTO> lastItems = itemService.getLastAddedItems();
        return ResponseEntity.ok(lastItems);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long itemId) {
        return itemService.getItemById(itemId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody ItemDTO itemDTO, HttpServletRequest request) {
        ResponseEntity<?> validationResponse = objectsValidations.validateCollectionId(request, itemDTO.getCollectionId());
        if (validationResponse.getStatusCode().isError()) {
            return validationResponse;
        }
        ItemDTO item = itemService.createItem(itemDTO);
        return ResponseEntity.ok(item);
    }

    @PutMapping()
    public ResponseEntity<?> updateItem(@RequestBody ItemDTO itemDTO, HttpServletRequest request) {
        ResponseEntity<?> validationResponse = objectsValidations.validateItemId(request, itemDTO.getId());
        if (validationResponse.getStatusCode().isError()) {
            return validationResponse;
        }
        ItemDTO item = itemService.updateItem(itemDTO.getId(), itemDTO);
        return ResponseEntity.ok(item);
    }

}
