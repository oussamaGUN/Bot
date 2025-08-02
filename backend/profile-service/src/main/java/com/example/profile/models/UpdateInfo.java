package com.example.profile.models;

import lombok.Data;

@Data
public class UpdateInfo {
    private String old_email;
    private String new_email;
    private String old_password;
    private String new_password;
}
