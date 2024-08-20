package com.cr1st1an.itemskeeper.backend.services;

import com.cr1st1an.itemskeeper.backend.persistence.entities.User;

public interface IAdminService {
    public String assignRole(Long userId, String roleName);
    public String removeRole(Long userId, String roleName);
    public Iterable<User> getUsers();
    public String blockUser(Long userId);
    public String unblockUser(Long userId);
}