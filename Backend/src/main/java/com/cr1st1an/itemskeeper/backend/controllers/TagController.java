package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ITagService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.TagDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api/v1/tags")
public class TagController {
    private final ITagService tagService;

    @Autowired
    public TagController(ITagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping()
    public List<TagDTO> getAllTags() {
        return tagService.getAllTags();
    }
}
