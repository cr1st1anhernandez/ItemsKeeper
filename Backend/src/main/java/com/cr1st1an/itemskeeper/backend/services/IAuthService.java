package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.LoginDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.LoginResponseDTO;
import com.cr1st1an.itemskeeper.backend.services.models.dtos.ResponseDTO;

public interface IAuthService {

    public LoginResponseDTO login(LoginDTO login) throws Exception;

    public ResponseDTO register(User user) throws Exception;
}
