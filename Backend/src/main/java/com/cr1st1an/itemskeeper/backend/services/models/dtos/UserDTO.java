package com.cr1st1an.itemskeeper.backend.services.models.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private boolean active;
}
