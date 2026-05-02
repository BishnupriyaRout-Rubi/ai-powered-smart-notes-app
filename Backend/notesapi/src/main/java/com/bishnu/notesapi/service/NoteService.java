package com.bishnu.notesapi.service;

import com.bishnu.notesapi.model.Note;
import com.bishnu.notesapi.repository.NoteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {

    private final NoteRepository repo;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NoteService(
            NoteRepository repo,
            SimpMessagingTemplate messagingTemplate
    ){
        this.repo = repo;
        this.messagingTemplate = messagingTemplate;
    }

    /* GET ALL */
    public List<Note> getAllNotes(){
        return repo.findByDeletedFalse();
    }

    /* SAVE */
    public Note saveNote(Note note){

        note.setCreatedAt(LocalDateTime.now().toString());

        Note savedNote = repo.save(note);

        sendNotification("New note created: " + savedNote.getTitle());

        return savedNote;
    }

    /* DELETE */
    public void deleteNote(Long id){

        Note note = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setDeleted(true);
        repo.save(note);

        sendNotification("Note moved to trash");
    }

    /* GET BY ID */
    public Note getNoteById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
    }

    /* UPDATE */
    public Note updateNote(Long id, Note newNote){

        System.out.println("🔥 SERVICE METHOD HIT");

        Note oldNote = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        oldNote.setTitle(newNote.getTitle());
        oldNote.setContent(newNote.getContent());
        oldNote.setColor(newNote.getColor());
        oldNote.setFont(newNote.getFont());

        Note savedNote = repo.save(oldNote);

        String userEmail = oldNote.getUser().getEmail();

        sendNotification(
                userEmail + " updated \"" + savedNote.getTitle() + "\""
        );

        return savedNote;
    }

    /* RESTORE */
    public Note restoreNote(Long id){

        Note note = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setDeleted(false);

        return repo.save(note);
    }

    /* DELETE FOREVER */
    public void deleteForever(Long id){
        repo.deleteById(id);
    }

    //  IMPORTANT METHOD
    public void sendNotification(String message){
        System.out.println("📡 Sending: " + message);

        messagingTemplate.convertAndSend(
                "/topic/notes",
                message
        );
    }
}