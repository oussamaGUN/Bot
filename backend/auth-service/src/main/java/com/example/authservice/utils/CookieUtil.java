package com.example.authservice.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class CookieUtil {
    public void setTokenCookie(HttpServletResponse response, String token_name, String token) {
        Cookie cookie = new Cookie(token_name, token);
        cookie.setHttpOnly(true); // Prevent access from JavaScript
        cookie.setSecure(true);   // Only send over HTTPS
        cookie.setPath("/");      // Cookie is valid for all endpoints
        cookie.setMaxAge(15 * 60); // 15 minutes in seconds
        response.addCookie(cookie);
    }
    public void deleteTokenCookie(HttpServletResponse response, String token_name, String token) {
        Cookie cookie = new Cookie(token_name, token);
        cookie.setHttpOnly(true); // Prevent access from JavaScript
        cookie.setSecure(true);   // Only send over HTTPS
        cookie.setPath("/");      // Cookie is valid for all endpoints
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
