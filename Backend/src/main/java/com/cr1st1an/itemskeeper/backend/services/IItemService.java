package com.cr1st1an.itemskeeper.backend.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;

public interface IItemService {
    public Item createItem(Long collectionId, String name, List<String> tags, Map<String, Object> customFieldValues);
    public List<Item> getItemsByCollectionId(Long collectionId);
    public Optional<Item> getItemById(Long itemId);
    public Item updateItem(Long itemId, String name, List<String> tags, Map<String, Object> customFieldValues);
    public void deleteItem(Long itemId);
}
