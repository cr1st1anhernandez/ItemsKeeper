package com.cr1st1an.itemskeeper.backend.controllers;

import com.cr1st1an.itemskeeper.backend.services.ICategoryService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final ICategoryService categoryService;

    @Autowired
    public CategoryController( ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public List<CategoryDTO> getAllTags() {
        return categoryService.getAllCategories();
    }
}
