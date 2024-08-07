package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CollectionRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.ItemRepository;
import com.cr1st1an.itemskeeper.backend.services.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ItemServiceImpl implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Transactional
    public Item createItem(Long collectionId, String name, List<String> tags, Map<String, Object> customFieldValues) {
        Collection collection = collectionRepository.findById(collectionId).orElseThrow(() -> new RuntimeException("Collection not found"));
        Item item = new Item();
        item.setName(name);
        item.setTags(tags);
        item.setCustomFields(customFieldValues);
        item.setCollection(collection);
        return itemRepository.save(item);
    }

    public List<Item> getItemsByCollectionId(Long collectionId) {
        return itemRepository.findByCollectionId(collectionId);
    }

    public Optional<Item> getItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }

    @Transactional
    public Item updateItem(Long itemId, String name, List<String> tags, Map<String, Object> customFieldValues) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(name);
        item.setTags(tags);
        item.setCustomFields(customFieldValues);
        return itemRepository.save(item);
    }

    @Transactional
    public void deleteItem(Long itemId) {
        itemRepository.deleteById(itemId);
    }
}
