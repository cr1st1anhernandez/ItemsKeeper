package com.cr1st1an.itemskeeper.backend.utils;

import com.cr1st1an.itemskeeper.backend.services.impl.JWTUtilityServiceImpl;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;

@Component
public class JWTUtils {

    private final JWTUtilityServiceImpl jwtUtilityService;

    @Autowired
    public JWTUtils(JWTUtilityServiceImpl jwtUtilityService) {
        this.jwtUtilityService = jwtUtilityService;
    }

    public Long getUserIdFromJWT(String token) throws ParseException, JOSEException, IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        JWTClaimsSet claims = jwtUtilityService.parseJWT(token);
        return Long.parseLong(claims.getSubject());
    }
}
