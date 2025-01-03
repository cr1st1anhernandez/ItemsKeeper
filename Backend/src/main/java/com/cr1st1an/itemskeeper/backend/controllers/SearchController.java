package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICollectionService;
import com.cr1st1an.itemskeeper.backend.services.IItemService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CollectionDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.SearchResultDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    private final ICollectionService collectionsService;
    private final IItemService itemsService;

    @Autowired
    public SearchController(ICollectionService collectionsService, IItemService itemsService) {
        this.collectionsService = collectionsService;
        this.itemsService = itemsService;
    }


    @GetMapping
    public ResponseEntity<SearchResultDTO> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<CollectionDTO> collections = collectionsService.searchCollections(query, page, size);
        List<ItemDTO> items = itemsService.searchItems(query, page, size);

        SearchResultDTO results = new SearchResultDTO();
        results.setCollections(collections);
        results.setItems(items);

        return ResponseEntity.ok(results);
    }
}
