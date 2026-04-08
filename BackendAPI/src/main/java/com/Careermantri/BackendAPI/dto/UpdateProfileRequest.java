package com.Careermantri.BackendAPI.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateProfileRequest(
        @NotBlank(message = "Full name is required")
        String fullName,
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
