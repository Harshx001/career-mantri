package com.Careermantri.BackendAPI.dto;

public record UserProfileResponse(
        Long id,
        String fullName,
        String email,
        String educationLevel,
        String interests,
        String skills,
        String preferredWorkStyle,
        String careerGoal
) {
}
