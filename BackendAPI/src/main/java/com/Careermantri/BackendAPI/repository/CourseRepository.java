package com.Careermantri.BackendAPI.repository;

import com.Careermantri.BackendAPI.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByTagIgnoreCaseOrderByTitleAsc(String tag);

    List<Course> findAllByOrderByTitleAsc();
}
