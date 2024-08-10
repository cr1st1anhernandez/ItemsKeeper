package com.cr1st1an.itemskeeper.backend.services.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CollectionDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 3,max = 50, message = "Name must be less than or equal to 100 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 255, message = "Description must be less than or equal to 255 characters")
    private String description;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must be less than or equal to 50 characters")
    private String category;

    private String imageUrl;

    @NotNull(message = "User ID is required")
    private Long userId;
}
