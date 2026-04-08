package com.Careermantri.BackendAPI.service;

import com.Careermantri.BackendAPI.dto.AuthRequest;
import com.Careermantri.BackendAPI.dto.AuthResponse;
import com.Careermantri.BackendAPI.dto.SignupRequest;
import com.Careermantri.BackendAPI.entity.UserAccount;
import com.Careermantri.BackendAPI.exception.DuplicateResourceException;
import com.Careermantri.BackendAPI.exception.UnauthorizedException;
import com.Careermantri.BackendAPI.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.UUID;

@Service
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileService userProfileService;

    public AuthService(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder,
            UserProfileService userProfileService
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
        this.userProfileService = userProfileService;
    }

    public AuthResponse signup(SignupRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase(Locale.ENGLISH);

        if (userAccountRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new DuplicateResourceException("Email is already registered. Try login instead.");
        }

        UserAccount user = new UserAccount();
        user.setFullName(request.fullName().trim());
        user.setEmail(normalizedEmail);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setEducationLevel(request.educationLevel().trim());
        user.setInterests(request.interests().trim());
        user.setSkills(request.skills().trim());
        user.setPreferredWorkStyle(request.preferredWorkStyle().trim());
        user.setCareerGoal(request.careerGoal().trim());

        UserAccount savedUser = userAccountRepository.save(user);
        return new AuthResponse(generateToken(savedUser), userProfileService.toResponse(savedUser));
    }

    public AuthResponse login(AuthRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase(Locale.ENGLISH);
        UserAccount user = userAccountRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        return new AuthResponse(generateToken(user), userProfileService.toResponse(user));
    }

    private String generateToken(UserAccount user) {
        return "cm_" + user.getId() + "_" + UUID.randomUUID();
    }
}
