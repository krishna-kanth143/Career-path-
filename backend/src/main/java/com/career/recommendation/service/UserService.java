package com.career.recommendation.service;

import com.career.recommendation.entity.User;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);

    Optional<User> loginUser(String email, String password);

    User updateUser(Long id, User user);

    User getUserById(Long id);
}
