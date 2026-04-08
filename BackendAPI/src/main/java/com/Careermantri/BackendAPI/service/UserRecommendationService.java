package com.Careermantri.BackendAPI.service;

import com.Careermantri.BackendAPI.dto.RecommendationRequest;
import com.Careermantri.BackendAPI.dto.RecommendationResponse;
import com.Careermantri.BackendAPI.entity.UserAccount;
import org.springframework.stereotype.Service;

@Service
public class UserRecommendationService {

    private final UserProfileService userProfileService;
    private final RecommendationService recommendationService;

    public UserRecommendationService(
            UserProfileService userProfileService,
            RecommendationService recommendationService
    ) {
        this.userProfileService = userProfileService;
        this.recommendationService = recommendationService;
    }

    public RecommendationResponse generateForUser(Long userId) {
        UserAccount user = userProfileService.getUserEntity(userId);

        RecommendationRequest request = new RecommendationRequest(
                user.getFullName(),
                user.getEducationLevel(),
                user.getInterests(),
                user.getSkills(),
                user.getPreferredWorkStyle(),
                user.getCareerGoal()
        );

        return recommendationService.generateRecommendations(request);
    }
}
