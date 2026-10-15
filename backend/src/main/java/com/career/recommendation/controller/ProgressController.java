package com.career.recommendation.controller;

import com.career.recommendation.entity.UserProgress;
import com.career.recommendation.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/user/{userId}")
    public List<UserProgress> getUserProgress(@PathVariable Long userId) {
        return progressService.getUserProgress(userId);
    }

    @PostMapping("/start")
    public UserProgress startSkill(@RequestBody Map<String, Long> payload) {
        return progressService.startSkill(payload.get("userId"), payload.get("skillId"));
    }

    @PostMapping("/update-time")
    public UserProgress updateTime(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long skillId = Long.valueOf(payload.get("skillId").toString());
        int minutes = Integer.parseInt(payload.get("minutes").toString());
        return progressService.updateTimeSpent(userId, skillId, minutes);
    }

    @PostMapping("/complete")
    public UserProgress completeSkill(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Long skillId = Long.valueOf(payload.get("skillId").toString());
        int score = Integer.parseInt(payload.get("score").toString());
        return progressService.completeSkill(userId, skillId, score);
    }
}
