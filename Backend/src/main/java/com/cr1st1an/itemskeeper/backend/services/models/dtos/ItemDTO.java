package com.cr1st1an.itemskeeper.backend.services.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    private Long id;
    private Set<TagDTO> tags;
    @NotBlank
    private Long collectionId;
    private String collectionName;
    private String creatorName;
    @NotBlank
    @Size(min = 1, max = 255)
    private String name;
    private String imageUrl;
    private LocalDateTime createdAt;
    private Map<String, Object> customFields;
}
