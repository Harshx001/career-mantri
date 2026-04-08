package com.Careermantri.BackendAPI.dto;

public record CourseResponse(
        Long id,
        String title,
        String tag,
        String level,
        Integer durationWeeks,
        String description
) {
}
