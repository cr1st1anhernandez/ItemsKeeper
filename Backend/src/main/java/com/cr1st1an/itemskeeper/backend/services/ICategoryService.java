package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.services.models.dtos.CategoryDTO;

import java.util.List;

public interface ICategoryService {
    List<CategoryDTO> getAllCategories();
}
