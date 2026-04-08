package com.Careermantri.BackendAPI;

import com.Careermantri.BackendAPI.dto.RecommendationRequest;
import com.Careermantri.BackendAPI.dto.RecommendationResponse;
import com.Careermantri.BackendAPI.service.RecommendationService;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class RecommendationServiceTests {

    private final RecommendationService recommendationService = new RecommendationService();

    @Test
    void generatesThreeRecommendationsWithSummary() {
        RecommendationRequest request = new RecommendationRequest(
                "Aarav",
                "Undergraduate",
                "technology, ai, data",
                "java, python, analytics",
                "Hybrid",
                "Build products with software and insights"
        );

        RecommendationResponse response = recommendationService.generateRecommendations(request);

        assertThat(response.profileSummary()).isNotBlank();
        assertThat(response.recommendations()).hasSize(3);
        assertThat(response.recommendations().getFirst().matchScore()).isGreaterThanOrEqualTo(35);
    }
}
