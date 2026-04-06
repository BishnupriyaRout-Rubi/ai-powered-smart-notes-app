package com.bishnu.notesapi.controller;

import com.bishnu.notesapi.model.Note;
import com.bishnu.notesapi.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bishnu.notesapi.model.User;
import com.bishnu.notesapi.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository repo;

    // 🔥 GET ALL
    @GetMapping
    public List<Note> getUserNotes(@RequestParam String email) {
        return repo.findByUserEmailAndDeletedFalse(email);
    }
    // 🔥 POST (MAIN FIX)
    @PostMapping
    public Note addNote(@RequestBody Note note) {

        System.out.println("Saving Note:");
        System.out.println("Title: " + note.getTitle());
        System.out.println("Content: " + note.getContent());

        User user = userRepository.findByEmail(note.getUser().getEmail());
        note.setUser(user);

        return repo.save(note);

    }

    // 🔥 DELETE (soft delete)
    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable Long id) {
        Note note = repo.findById(id).orElse(null);

        if (note != null) {
            note.setDeleted(true);
            repo.save(note);
        }

        return "Deleted successfully";
    }

    // 🔥 GET BY ID
    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // 🔥 UPDATE
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {

        Note note = repo.findById(id).orElse(null);

        if (note != null) {
            note.setTitle(updatedNote.getTitle());
            note.setContent(updatedNote.getContent());
            note.setColor(updatedNote.getColor());
            note.setFont(updatedNote.getFont());
            return repo.save(note);
        }

        return null;
    }

    // 🔥 TRASH
    @GetMapping("/trash")
    public List<Note> getTrashNotes() {
        return repo.findByDeletedTrue();
    }

    // 🔥 RESTORE
    @PutMapping("/restore/{id}")
    public Note restoreNote(@PathVariable Long id) {
        Note note = repo.findById(id).orElse(null);

        if (note != null) {
            note.setDeleted(false);
            return repo.save(note);
        }

        return null;
    }

    // 🔥 DELETE FOREVER
    @DeleteMapping("/delete/{id}")
    public String deleteForever(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted Permanently";
    }
}