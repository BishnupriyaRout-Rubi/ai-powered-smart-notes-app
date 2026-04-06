package com.bishnu.notesapi.repository;
import java.util.List;
import com.bishnu.notesapi.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

//JpaRepository is the magic of Spring
//it automatically gives =  save(), findAll(), deleteById(), findById()
//we don't have to write SQL
//Repository == connection to DB directly
//here <Note, Long> --  creates repository for the table "Note" and the ID type is Long
//Note == databse table.  Long = datatype of ID


public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByDeletedFalse();
    List<Note> findByDeletedTrue();
    List<Note> findByUserEmail(String email);
    List<Note> findByUserEmailAndDeletedFalse(String email);
}
