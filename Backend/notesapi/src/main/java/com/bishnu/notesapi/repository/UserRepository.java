package com.bishnu.notesapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bishnu.notesapi.model.User;
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
