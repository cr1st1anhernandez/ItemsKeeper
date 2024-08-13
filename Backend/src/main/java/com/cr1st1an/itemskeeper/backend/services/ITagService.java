package com.cr1st1an.itemskeeper.backend.services;


import com.cr1st1an.itemskeeper.backend.services.models.dtos.TagDTO;

import java.util.List;

public interface ITagService {
    List<TagDTO> getAllTags();
}
