package com.Careermantri.BackendAPI.controller;

import com.Careermantri.BackendAPI.dto.CourseResponse;
import com.Careermantri.BackendAPI.service.CourseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<CourseResponse> listCourses(@RequestParam(required = false) String tag) {
        return courseService.listCourses(tag);
    }
}
