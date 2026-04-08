package com.Careermantri.BackendAPI.dto;

import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record SignupRequest(
        @NotBlank(message = "Full name is required")
        String fullName,
        @Email(message = "Please provide a valid email")
        @NotBlank(message = "Email is required")
        String email,
        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must have at least 6 characters")
        String password,
        @NotBlank(message = "Education level is required")
        String educationLevel,
        @NotBlank(message = "Interests are required")
        String interests,
        @NotBlank(message = "Skills are required")
        String skills,
        @NotBlank(message = "Preferred work style is required")
        String preferredWorkStyle,
        @NotBlank(message = "Career goal is required")
        String careerGoal
) {
}
