package com.bishnu.notesapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bishnu.notesapi.model.SharedNote;

public interface SharedNoteRepository
        extends JpaRepository<
        SharedNote,
        Long
        >{

    List<SharedNote>
    findByCollaboratorEmail(
            String email
    );

}