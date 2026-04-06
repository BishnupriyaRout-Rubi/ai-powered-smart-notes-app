package com.bishnu.notesapi.model;

import jakarta.persistence.*;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // 🔥 FIX: Large content support (VERY IMPORTANT)
    @Column(columnDefinition = "TEXT")
    private String content;

    private String createdAt;

    private Boolean deleted = false;

    private String color;

    private String font;

    // 👇 ADD THIS
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 🔥 OPTIONAL: auto timestamp
    @PrePersist
    public void onCreate() {
        this.createdAt = java.time.LocalDateTime.now().toString();
    }

    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFont() {
        return font;
    }

    public void setFont(String font) {
        this.font = font;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}