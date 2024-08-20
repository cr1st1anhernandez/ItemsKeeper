package com.cr1st1an.itemskeeper.backend.config;

import com.cr1st1an.itemskeeper.backend.services.models.validations.ObjectsValidations;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ValidationsConfig {
    @Bean
    public ObjectsValidations objectsValidations() {
        return new ObjectsValidations();
    }
}
