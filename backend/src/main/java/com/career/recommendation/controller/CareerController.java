package com.career.recommendation.controller;

import com.career.recommendation.entity.Career;
import com.career.recommendation.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/careers")
@CrossOrigin(origins = "*")
public class CareerController {

    @Autowired
    private CareerService careerService;

    @GetMapping
    public List<Career> getAllCareers() {
        return careerService.getAllCareers();
    }

    @GetMapping("/{id}")
    public Career getCareer(@PathVariable Long id) {
        return careerService.getCareerById(id);
    }

    @GetMapping("/recommend/{userId}")
    public List<Career> getRecommendations(@PathVariable Long userId) {
        return careerService.recommendCareers(userId);
    }

    @PostMapping
    public Career addCareer(@RequestBody Career career) {
        return careerService.addCareer(career);
    }
}
