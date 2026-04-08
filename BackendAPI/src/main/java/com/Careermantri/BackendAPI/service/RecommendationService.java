package com.Careermantri.BackendAPI.service;

import com.Careermantri.BackendAPI.dto.RecommendationItem;
import com.Careermantri.BackendAPI.dto.RecommendationRequest;
import com.Careermantri.BackendAPI.dto.RecommendationResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class RecommendationService {

    private static final List<CareerTrack> CAREER_TRACKS = List.of(
            new CareerTrack(
                    "Software Engineer",
                    List.of("java", "python", "coding", "problem solving", "algorithms", "technology", "development"),
                    "Build 2 portfolio projects and practice data structures for product companies."
            ),
            new CareerTrack(
                    "Data Analyst",
                    List.of("analytics", "excel", "sql", "python", "statistics", "data", "insights"),
                    "Start a dashboard project and learn SQL with business case studies."
            ),
            new CareerTrack(
                    "UX Designer",
                    List.of("design", "creativity", "research", "wireframe", "user", "figma", "empathy"),
                    "Create 3 case studies showing research, flows, and interface decisions."
            ),
            new CareerTrack(
                    "Digital Marketing Specialist",
                    List.of("marketing", "branding", "content", "social media", "sales", "campaign", "growth"),
                    "Run a small campaign project and measure reach, conversion, and messaging."
            ),
            new CareerTrack(
                    "Career Counselor",
                    List.of("mentoring", "guidance", "communication", "psychology", "teaching", "coaching", "leadership"),
                    "Volunteer in mentoring sessions and document learner outcomes and advice frameworks."
            )
    );

    public RecommendationResponse generateRecommendations(RecommendationRequest request) {
        String combinedProfile = normalize(
                request.interests() + " " + request.skills() + " " + request.careerGoal() + " " + request.preferredWorkStyle()
        );

        List<RecommendationItem> rankedRecommendations = CAREER_TRACKS.stream()
                .map(track -> toRecommendation(track, combinedProfile, request))
                .sorted(Comparator.comparingInt(RecommendationItem::matchScore).reversed())
                .limit(3)
                .toList();

        String summary = buildSummary(request, rankedRecommendations);
        return new RecommendationResponse(summary, rankedRecommendations);
    }

    private RecommendationItem toRecommendation(
            CareerTrack track,
            String combinedProfile,
            RecommendationRequest request
    ) {
        List<String> strengths = new ArrayList<>();
        int score = 35;

        for (String keyword : track.keywords()) {
            if (combinedProfile.contains(keyword)) {
                score += 9;
                strengths.add(titleCase(keyword));
            }
        }

        if (request.educationLevel().equalsIgnoreCase("Postgraduate")) {
            score += 4;
        }

        if (request.preferredWorkStyle().equalsIgnoreCase("Remote")
                && track.name().equalsIgnoreCase("Digital Marketing Specialist")) {
            score += 5;
        }

        if (request.preferredWorkStyle().equalsIgnoreCase("Hybrid")
                && track.name().equalsIgnoreCase("Software Engineer")) {
            score += 5;
        }

        int boundedScore = Math.min(score, 98);
        List<String> topStrengths = strengths.isEmpty()
                ? List.of("Adaptability", "Career curiosity")
                : strengths.stream().distinct().limit(3).toList();

        String reason = request.fullName() + " shows alignment with " + track.name()
                + " through " + String.join(", ", topStrengths).toLowerCase(Locale.ENGLISH) + ".";

        return new RecommendationItem(
                track.name(),
                boundedScore,
                reason,
                topStrengths,
                track.nextStep()
        );
    }

    private String buildSummary(RecommendationRequest request, List<RecommendationItem> recommendations) {
        Set<String> paths = new LinkedHashSet<>();
        recommendations.forEach(item -> paths.add(item.careerPath()));

        return request.fullName() + " is currently profiled as a " + request.educationLevel().toLowerCase(Locale.ENGLISH)
                + " learner who prefers " + request.preferredWorkStyle().toLowerCase(Locale.ENGLISH)
                + " work. The strongest current matches are " + String.join(", ", paths) + ".";
    }

    private String normalize(String value) {
        return value.toLowerCase(Locale.ENGLISH);
    }

    private String titleCase(String value) {
        String[] parts = value.split(" ");
        StringBuilder builder = new StringBuilder();

        for (String part : parts) {
            if (part.isBlank()) {
                continue;
            }

            if (builder.length() > 0) {
                builder.append(' ');
            }

            builder.append(Character.toUpperCase(part.charAt(0)))
                    .append(part.substring(1));
        }

        return builder.toString();
    }

    private record CareerTrack(String name, List<String> keywords, String nextStep) {
    }
}
