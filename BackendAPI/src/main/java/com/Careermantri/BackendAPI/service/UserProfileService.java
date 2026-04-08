package com.Careermantri.BackendAPI.service;

import com.Careermantri.BackendAPI.dto.UpdateProfileRequest;
import com.Careermantri.BackendAPI.dto.UserProfileResponse;
import com.Careermantri.BackendAPI.entity.UserAccount;
import com.Careermantri.BackendAPI.exception.ResourceNotFoundException;
import com.Careermantri.BackendAPI.repository.UserAccountRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserAccountRepository userAccountRepository;

    public UserProfileService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public UserProfileResponse getProfile(Long userId) {
        UserAccount user = findUserOrThrow(userId);
        return toResponse(user);
    }

    public UserProfileResponse updateProfile(Long userId, UpdateProfileRequest request) {
        UserAccount user = findUserOrThrow(userId);
        user.setFullName(request.fullName().trim());
        user.setEducationLevel(request.educationLevel().trim());
        user.setInterests(request.interests().trim());
        user.setSkills(request.skills().trim());
        user.setPreferredWorkStyle(request.preferredWorkStyle().trim());
        user.setCareerGoal(request.careerGoal().trim());

        UserAccount savedUser = userAccountRepository.save(user);
        return toResponse(savedUser);
    }

    public UserAccount getUserEntity(Long userId) {
        return findUserOrThrow(userId);
    }

    public UserProfileResponse toResponse(UserAccount user) {
        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getEducationLevel(),
                user.getInterests(),
                user.getSkills(),
                user.getPreferredWorkStyle(),
                user.getCareerGoal()
        );
    }

    private UserAccount findUserOrThrow(Long userId) {
        return userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for id: " + userId));
    }
}
