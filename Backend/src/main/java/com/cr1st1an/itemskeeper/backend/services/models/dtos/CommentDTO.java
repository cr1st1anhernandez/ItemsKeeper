package com.cr1st1an.itemskeeper.backend.services.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private Long id;
    @NotBlank(message = "Text is required")
    @Size(min = 3,max = 255, message = "Text must be less than or equal to 255 characters")
    private String text;
    @NotNull(message = "User ID is required")
    private Long userId;
    @NotNull(message = "Item ID is required")
    private Long itemId;
    private String author;
}