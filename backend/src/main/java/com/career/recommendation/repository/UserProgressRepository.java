package com.career.recommendation.repository;

import com.career.recommendation.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);

    Optional<UserProgress> findByUserIdAndSkillId(Long userId, Long skillId);
}
