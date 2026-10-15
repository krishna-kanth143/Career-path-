package com.career.recommendation.service;

import com.career.recommendation.entity.Career;
import com.career.recommendation.entity.User;
import java.util.List;

public interface CareerService {
    List<Career> getAllCareers();

    Career getCareerById(Long id);

    List<Career> recommendCareers(Long userId);

    Career addCareer(Career career);
}
