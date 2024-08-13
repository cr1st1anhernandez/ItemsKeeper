package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.respositories.TagRepository;
import com.cr1st1an.itemskeeper.backend.services.ITagService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.TagDTO;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements ITagService {
    private final ConvertToDTOS convertToDTOS;
    private final TagRepository tagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository, ConvertToDTOS convertToDTOS) {
        this.tagRepository = tagRepository;
        this.convertToDTOS = convertToDTOS;
    }

    @Transactional(readOnly = true )
    public List<TagDTO> getAllTags() {
        return tagRepository.findAll()
                .stream()
                .map(convertToDTOS::convertTagToDTO)
                .collect(Collectors.toList());
    }
}
