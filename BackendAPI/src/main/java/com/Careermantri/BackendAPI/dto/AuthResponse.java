package com.Careermantri.BackendAPI.dto;

public record AuthResponse(
        String token,
        UserProfileResponse user
) {
}
