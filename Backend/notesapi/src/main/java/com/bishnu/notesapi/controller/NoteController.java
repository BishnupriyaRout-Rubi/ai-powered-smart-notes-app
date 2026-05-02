package com.bishnu.notesapi.controller;

import com.bishnu.notesapi.model.Note;
import com.bishnu.notesapi.model.SharedNote;
import com.bishnu.notesapi.model.User;

import com.bishnu.notesapi.repository.NoteRepository;
import com.bishnu.notesapi.repository.SharedNoteRepository;
import com.bishnu.notesapi.repository.UserRepository;

import com.bishnu.notesapi.service.NoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository repo;

    @Autowired
    private SharedNoteRepository sharedRepo;


    @GetMapping
    public List<Note> getUserNotes(@RequestParam String email){
        return repo.findByUserEmailAndDeletedFalse(email);
    }


    @PostMapping
    public Note addNote(@RequestBody Note note){

        User user = userRepository.findByEmail(note.getUser().getEmail());
        note.setUser(user);

        // 🔥 service use kar rahe hain (notification ke liye)
        return noteService.saveNote(note);
    }


    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable Long id){
        noteService.deleteNote(id);
        return "Deleted successfully";
    }


    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id){
        return noteService.getNoteById(id);
    }


    // ✅ CLEAN UPDATE (IMPORTANT)
    @PutMapping("/{id}")
    public Note updateNote(
            @PathVariable Long id,
            @RequestBody Note updatedNote
    ){
        return noteService.updateNote(id, updatedNote);
    }


    @GetMapping("/trash")
    public List<Note> getTrashNotes(@RequestParam String email){
        return repo.findByUserEmail(email)
                .stream()
                .filter(Note::isDeleted)
                .toList();
    }


    @PutMapping("/restore/{id}")
    public Note restoreNote(@PathVariable Long id){
        return noteService.restoreNote(id);
    }


    @DeleteMapping("/delete/{id}")
    public String deleteForever(@PathVariable Long id){
        noteService.deleteForever(id);
        return "Deleted Permanently";
    }


    @PostMapping("/share/{id}")
    public String shareNote(
            @PathVariable Long id,
            @RequestParam String ownerEmail,
            @RequestParam String collaboratorEmail
    ){

        Note note = repo.findById(id).orElse(null);

        if(note == null){
            return "Note not found";
        }

        User owner = userRepository.findByEmail(ownerEmail);
        User collaborator = userRepository.findByEmail(collaboratorEmail);

        if(collaborator == null){
            return "Collaborator not found";
        }

        SharedNote shared = new SharedNote();
        shared.setNote(note);
        shared.setOwner(owner);
        shared.setCollaborator(collaborator);

        sharedRepo.save(shared);

        //  REAL-TIME NOTIFICATION
        noteService.sendNotification("New note shared with you");

        return "Note shared successfully";
    }


    @GetMapping("/shared")
    public List<SharedNote> getSharedNotes(@RequestParam String email){
        return sharedRepo.findByCollaboratorEmail(email);
    }
}