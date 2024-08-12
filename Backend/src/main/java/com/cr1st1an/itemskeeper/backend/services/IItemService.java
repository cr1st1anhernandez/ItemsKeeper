package com.cr1st1an.itemskeeper.backend.services;

import java.util.List;
import java.util.Optional;

import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;

public interface IItemService {
    List<ItemDTO> getLastAddedItems();
    ItemDTO createItem(ItemDTO itemDTO);
    List<ItemDTO> getItemsByCollectionId(Long collectionId);
    Optional<ItemDTO> getItemById(Long itemId);
    ItemDTO updateItem(Long itemId, ItemDTO itemDTO);
    void deleteItem(Long itemId);
}
