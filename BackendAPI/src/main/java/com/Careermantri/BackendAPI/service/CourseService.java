package com.Careermantri.BackendAPI.service;

import com.Careermantri.BackendAPI.dto.CourseResponse;
import com.Careermantri.BackendAPI.entity.Course;
import com.Careermantri.BackendAPI.repository.CourseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @PostConstruct
    public void seedDefaultCourses() {
        if (courseRepository.count() > 0) {
            return;
        }

        List<Course> seedCourses = List.of(
                createCourse(
                        "Java + Spring Boot Foundation",
                        "Technology",
                        "Beginner",
                        8,
                        "Build backend APIs using Java, Spring Boot, and REST design basics."
                ),
                createCourse(
                        "Python for Data Analysis",
                        "Data",
                        "Beginner",
                        6,
                        "Use pandas, visualization, and statistics to solve practical data tasks."
                ),
                createCourse(
                        "SQL for Business Intelligence",
                        "Data",
                        "Intermediate",
                        5,
                        "Write analytical SQL queries and produce dashboard-friendly datasets."
                ),
                createCourse(
                        "UI/UX Case Study Bootcamp",
                        "Design",
                        "Intermediate",
                        7,
                        "Learn user research, wireframing, and portfolio-ready UX case studies."
                ),
                createCourse(
                        "Digital Marketing Strategy",
                        "Marketing",
                        "Intermediate",
                        6,
                        "Master campaign planning, SEO basics, and measurable growth tactics."
                ),
                createCourse(
                        "Career Counseling Essentials",
                        "Counseling",
                        "Beginner",
                        4,
                        "Understand learner psychology and guidance frameworks for career coaching."
                )
        );

        courseRepository.saveAll(seedCourses);
    }

    public List<CourseResponse> listCourses(String tag) {
        List<Course> courses;

        if (tag == null || tag.isBlank()) {
            courses = courseRepository.findAllByOrderByTitleAsc();
        } else {
            courses = courseRepository.findByTagIgnoreCaseOrderByTitleAsc(tag);
        }

        return courses.stream()
                .map(this::toResponse)
                .toList();
    }

    private Course createCourse(String title, String tag, String level, Integer durationWeeks, String description) {
        Course course = new Course();
        course.setTitle(title);
        course.setTag(tag);
        course.setLevel(level);
        course.setDurationWeeks(durationWeeks);
        course.setDescription(description);
        return course;
    }

    private CourseResponse toResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getTag(),
                course.getLevel(),
                course.getDurationWeeks(),
                course.getDescription()
        );
    }
}
