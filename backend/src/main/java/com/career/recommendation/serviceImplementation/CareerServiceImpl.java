package com.career.recommendation.serviceImplementation;

import com.career.recommendation.entity.Career;
import com.career.recommendation.entity.Skill;
import com.career.recommendation.entity.User;
import com.career.recommendation.repository.CareerRepository;
import com.career.recommendation.repository.UserRepository;
import com.career.recommendation.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CareerServiceImpl implements CareerService {

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    @Override
    public Career getCareerById(Long id) {
        return careerRepository.findById(id).orElseThrow(() -> new RuntimeException("Career not found"));
    }

    @Override
    public Career addCareer(Career career) {
        return careerRepository.save(career);
    }

    @Override
    public List<Career> recommendCareers(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Career> allCareers = careerRepository.findAll();

        List<String> userKeywords = user.getInterests().stream()
                .flatMap(interest -> java.util.Arrays.stream(interest.split("\\s+")))
                .map(String::toLowerCase)
                .filter(word -> word.length() > 2)
                .collect(Collectors.toList());

        // 1. Priority: Exact or partial match in Title
        List<Career> titleMatches = allCareers.stream().filter(career -> {
            String title = career.getTitle().toLowerCase();
            return userKeywords.stream().anyMatch(title::contains);
        }).collect(Collectors.toList());

        if (!titleMatches.isEmpty()) {
            return titleMatches;
        }

        // 2. Secondary: Whole-word match in Description
        List<Career> recommendations = allCareers.stream().filter(career -> {
            String desc = career.getDescription().toLowerCase();
            boolean interestMatch = userKeywords.stream().anyMatch(
                    keyword -> java.util.regex.Pattern.compile("\\b" + java.util.regex.Pattern.quote(keyword) + "\\b",
                            java.util.regex.Pattern.CASE_INSENSITIVE).matcher(desc).find());

            boolean skillMatch = career.getRequiredSkills().stream()
                    .anyMatch(reqSkill -> user.getSkills().contains(reqSkill));

            return interestMatch || skillMatch;
        }).collect(Collectors.toList());

        // Fallback: If no specific recommendations, return all careers
        if (recommendations.isEmpty()) {
            return allCareers;
        }

        return recommendations;
    }
}
