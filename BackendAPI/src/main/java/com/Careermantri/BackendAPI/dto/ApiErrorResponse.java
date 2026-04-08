package com.Careermantri.BackendAPI.dto;

import java.util.Map;

public record ApiErrorResponse(
        String message,
        Map<String, String> fieldErrors
) {
}
