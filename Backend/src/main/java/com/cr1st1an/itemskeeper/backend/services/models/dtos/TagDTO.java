package com.cr1st1an.itemskeeper.backend.services.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TagDTO {
    @NotBlank
    @Size(min = 1, max = 255)
    private String name;
}