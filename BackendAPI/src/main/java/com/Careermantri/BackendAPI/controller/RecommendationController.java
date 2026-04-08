package com.Careermantri.BackendAPI.controller;

import com.Careermantri.BackendAPI.dto.HealthResponse;
import com.Careermantri.BackendAPI.dto.RecommendationRequest;
import com.Careermantri.BackendAPI.dto.RecommendationResponse;
import com.Careermantri.BackendAPI.service.RecommendationService;
import com.Careermantri.BackendAPI.service.UserRecommendationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserRecommendationService userRecommendationService;

    public RecommendationController(
            RecommendationService recommendationService,
            UserRecommendationService userRecommendationService
    ) {
        this.recommendationService = recommendationService;
        this.userRecommendationService = userRecommendationService;
    }

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("Career Mantri backend is ready.");
    }

    @PostMapping
    public RecommendationResponse recommend(@Valid @RequestBody RecommendationRequest request) {
        return recommendationService.generateRecommendations(request);
    }

    @GetMapping("/user/{userId}")
    public RecommendationResponse recommendByUser(@PathVariable Long userId) {
        return userRecommendationService.generateForUser(userId);
    }
}
