package com.bishnu.notesapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bishnu.notesapi.model.Attachment;

public interface AttachmentRepository
        extends JpaRepository<
        Attachment,
        Long
        >{

    List<Attachment>
    findByNoteId(
            Long noteId
    );

}