package com.career.recommendation.serviceImplementation;

import com.career.recommendation.entity.Skill;
import com.career.recommendation.entity.User;
import com.career.recommendation.entity.UserProgress;
import com.career.recommendation.repository.SkillRepository;
import com.career.recommendation.repository.UserProgressRepository;
import com.career.recommendation.repository.UserRepository;
import com.career.recommendation.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressServiceImpl implements ProgressService {

    @Autowired
    private UserProgressRepository userProgressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public UserProgress checkProgress(Long userId, Long skillId) {
        return userProgressRepository.findByUserIdAndSkillId(userId, skillId).orElse(null);
    }

    @Override
    public UserProgress startSkill(Long userId, Long skillId) {
        Optional<UserProgress> existing = userProgressRepository.findByUserIdAndSkillId(userId, skillId);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));

        UserProgress progress = new UserProgress();
        progress.setUser(user);
        progress.setSkill(skill);
        progress.setStatus("IN_PROGRESS");
        progress.setStartedAt(LocalDateTime.now());
        progress.setTimeSpentMinutes(0);

        return userProgressRepository.save(progress);
    }

    @Override
    public UserProgress updateTimeSpent(Long userId, Long skillId, int minutes) {
        UserProgress progress = userProgressRepository.findByUserIdAndSkillId(userId, skillId)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        progress.setTimeSpentMinutes(progress.getTimeSpentMinutes() + minutes);
        return userProgressRepository.save(progress);
    }

    @Override
    public UserProgress completeSkill(Long userId, Long skillId, int checkScore) {
        UserProgress progress = userProgressRepository.findByUserIdAndSkillId(userId, skillId)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        // Rule: Score > 70% and Time Spent >= Min Duration
        int minMinutes = progress.getSkill().getMinDurationMinutes();

        if (checkScore >= 70 && progress.getTimeSpentMinutes() >= minMinutes) {
            progress.setStatus("COMPLETED");
            progress.setCompletedAt(LocalDateTime.now());
        }

        return userProgressRepository.save(progress);
    }

    @Override
    public List<UserProgress> getUserProgress(Long userId) {
        return userProgressRepository.findByUserId(userId);
    }
}
