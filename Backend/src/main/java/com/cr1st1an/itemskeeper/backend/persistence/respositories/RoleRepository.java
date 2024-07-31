package com.cr1st1an.itemskeeper.backend.persistence.respositories;

import com.cr1st1an.itemskeeper.backend.persistence.entities.Role;
import com.cr1st1an.itemskeeper.backend.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
