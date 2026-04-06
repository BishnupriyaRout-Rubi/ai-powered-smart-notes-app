package com.bishnu.notesapi.service;

import com.bishnu.notesapi.model.Note;
import com.bishnu.notesapi.repository.NoteRepository;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.List;

@Service  //it shows that this lass handles bussiness logic, with java code
public class NoteService {

    @Autowired      //Spring automatically creates object and inject it,
                    // No need to create object manually by "new" keyword
    private NoteRepository repo;
//GET All
public List<Note> getAllNotes(){
    return repo.findByDeletedFalse();   // 🔥 new
}
//SAVE
    public Note saveNote(Note note){     //for save notes
        note.setCreatedAt(LocalDateTime.now().toString()); // set date -time
        return repo.save(note);           //it save notes in note table in database == save(note)
    }
//DELETE
public void deleteNote(Long id){
    Note note = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found"));

    note.setDeleted(true);   // 🔥 move to trash
    repo.save(note);
}


//GET BY ID
    public Note getNoteById(Long id){
        return repo.findById(id).
                orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
    }

//UPDATE
     public Note updateNote(Long id, Note newNote){
        Note oldNote = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));

         // 🔥 update
         oldNote.setTitle(newNote.getTitle());
         oldNote.setContent(newNote.getContent());

         return repo.save(oldNote);


     }

     public Note restoreNote(Long id){
    Note note = repo.findById(id).orElseThrow();
    note.setDeleted(false);

    return repo.save(note);
     }
     public void deleteForever(Long id){
    repo.deleteById(id);
     }
}
