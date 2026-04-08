package com.Careermantri.BackendAPI.dto;

import java.util.List;

public record RecommendationResponse(
        String profileSummary,
        List<RecommendationItem> recommendations
) {
}
