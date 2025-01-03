package com.cr1st1an.itemskeeper.backend.services.models.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDTO {
    private List<CollectionDTO> collections;
    private List<ItemDTO> items;
}
