package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.IItemService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {

    private final IItemService itemService;

    @Autowired
    public ItemController(IItemService itemService) {
        this.itemService = itemService;
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

    @PutMapping("/{itemId}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long itemId, @RequestBody ItemDTO itemDTO) {
        ItemDTO updatedItem = itemService.updateItem(itemId, itemDTO);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
