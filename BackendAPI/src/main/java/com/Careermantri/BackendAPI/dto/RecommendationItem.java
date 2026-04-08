package com.Careermantri.BackendAPI.dto;

import java.util.List;

public record RecommendationItem(
        String careerPath,
        int matchScore,
        String reason,
        List<String> strengthAreas,
        String nextStep
) {
}
