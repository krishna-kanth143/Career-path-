package com.career.recommendation.service;

import com.career.recommendation.entity.UserProgress;
import java.util.List;

public interface ProgressService {
    UserProgress checkProgress(Long userId, Long skillId);

    UserProgress startSkill(Long userId, Long skillId);

    UserProgress updateTimeSpent(Long userId, Long skillId, int minutes);

    UserProgress completeSkill(Long userId, Long skillId, int checkScore);

    List<UserProgress> getUserProgress(Long userId);
}
