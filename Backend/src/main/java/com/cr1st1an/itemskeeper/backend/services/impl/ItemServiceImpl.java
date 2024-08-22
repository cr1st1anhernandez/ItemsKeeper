package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Collection;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Item;
import com.cr1st1an.itemskeeper.backend.persistence.entities.Tag;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.CollectionRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.ItemRepository;
import com.cr1st1an.itemskeeper.backend.persistence.respositories.TagRepository;
import com.cr1st1an.itemskeeper.backend.services.IItemService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ItemDTO;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements IItemService {

    private final ItemRepository itemRepository;
    private final CollectionRepository collectionRepository;
    private final TagRepository tagRepository;
    private final ConvertToDTOS convertToDTOS = new ConvertToDTOS();

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, CollectionRepository collectionRepository, TagRepository tagRepository) {
        this.itemRepository = itemRepository;
        this.collectionRepository = collectionRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional
    public List<ItemDTO> getLastAddedItems() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Item> lastItems = itemRepository.findLastAddedItems(pageable);
        return lastItems.stream()
                .map(convertToDTOS::convertItemToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ItemDTO createItem(ItemDTO itemDTO) {
        Collection collection = collectionRepository.findById(itemDTO.getCollectionId())
                .orElseThrow(() -> new RuntimeException("Collection not found"));
        Item item = new Item();
        item.setName(itemDTO.getName());
        item.setTags(itemDTO.getTags().stream().map(tagDTO -> tagRepository.findByName(tagDTO.getName())
                .orElseGet(() -> {
                    Tag newTag = new Tag();
                    newTag.setName(tagDTO.getName());
                    return tagRepository.save(newTag);
                })).collect(Collectors.toSet()));
        item.setCustomFields(itemDTO.getCustomFields());
        item.setCollection(collection);
        item.setImageUrl(itemDTO.getImageUrl());

        Item savedItem = itemRepository.save(item);
        return convertToDTOS.convertItemToDTO(savedItem);
    }

    @Transactional
    public List<ItemDTO> getItemsByCollectionId(Long collectionId) {
        List<Item> items = itemRepository.findByCollectionId(collectionId);
        return items.stream()
                .map(convertToDTOS::convertItemToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<ItemDTO> getItemById(Long itemId) {
        return itemRepository.findById(itemId).map(convertToDTOS::convertItemToDTO);
    }

    @Transactional
    public ItemDTO updateItem(Long itemId, ItemDTO itemDTO) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setName(itemDTO.getName());
        item.setCustomFields(itemDTO.getCustomFields());
        item.setImageUrl(itemDTO.getImageUrl());
        Item updatedItem = itemRepository.save(item);
        return convertToDTOS.convertItemToDTO(updatedItem);
    }

    @Transactional
    public void deleteItem(Long itemId) {
        itemRepository.deleteById(itemId);
    }

}
