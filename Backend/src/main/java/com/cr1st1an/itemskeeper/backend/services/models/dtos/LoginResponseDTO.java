package com.cr1st1an.itemskeeper.backend.services.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private String jwt;
    private UserDTO user;
    private String error;
    private Integer numOfErrors;
}
