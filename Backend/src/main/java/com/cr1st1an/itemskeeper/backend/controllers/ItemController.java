package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.services.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/collections/{collectionId}/items")
public class ItemController {

    @Autowired
    private IItemService itemService;

    @PostMapping
    public ResponseEntity<Item> createItem(@PathVariable Long collectionId, @RequestParam String name, @RequestParam List<String> tags, @RequestParam Map<String, Object> customFieldValues) {
        Item item = itemService.createItem(collectionId, name, tags, customFieldValues);
        return ResponseEntity.ok(item);
    }

    @GetMapping
    public ResponseEntity<List<Item>> getItemsByCollectionId(@PathVariable Long collectionId) {
        return ResponseEntity.ok(itemService.getItemsByCollectionId(collectionId));
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable Long itemId) {
        return itemService.getItemById(itemId).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Item> updateItem(@PathVariable Long itemId, @RequestParam String name, @RequestParam List<String> tags, @RequestParam Map<String, Object> customFieldValues) {
        Item item = itemService.updateItem(itemId, name, tags, customFieldValues);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
