package com.cr1st1an.itemskeeper.backend.services.impl;

import com.cr1st1an.itemskeeper.backend.persistence.respositories.CategoryRepository;
import com.cr1st1an.itemskeeper.backend.services.ICategoryService;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.CategoryDTO;
import com.cr1st1an.itemskeeper.backend.utils.ConvertToDTOS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ICategoryServiceImpl implements ICategoryService {
    private final CategoryRepository categoryRepository;
    private final ConvertToDTOS convertToDTOS;

    @Autowired
    public ICategoryServiceImpl(CategoryRepository categoryRepository, ConvertToDTOS convertToDTOS) {
        this.categoryRepository = categoryRepository;
        this.convertToDTOS = convertToDTOS;
    }


    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(convertToDTOS::convertCategoryToDTO)
                .collect(Collectors.toList());
    }
}
