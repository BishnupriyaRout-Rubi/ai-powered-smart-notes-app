package com.bishnu.notesapi.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.bishnu.notesapi.model.Note;
import com.bishnu.notesapi.model.Attachment;

import com.bishnu.notesapi.repository.NoteRepository;
import com.bishnu.notesapi.repository.AttachmentRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/files")
@CrossOrigin(origins="*")
public class AttachmentController {

    @Autowired
    private AttachmentRepository
            attachmentRepository;

    @Autowired
    private NoteRepository
            noteRepository;





    @PostMapping(
            value="/upload/{noteId}",
            consumes="multipart/form-data"
    )
    public String uploadFile(

            @PathVariable
            Long noteId,

            @RequestParam("file")
            MultipartFile file

    )throws IOException{


        System.out.println(
                "UPLOAD API HIT"
        );



        String uploadDir=
                System.getProperty("user.dir")
                        +
                        "/uploads/";



        File folder=
                new File(uploadDir);

        if(!folder.exists()){
            folder.mkdirs();
        }



        String fileName=
                System.currentTimeMillis()
                        +
                        "_"
                        +
                        file.getOriginalFilename();



        String filePath=
                uploadDir
                        +
                        fileName;



        file.transferTo(
                new File(filePath)
        );




        Note note=
                noteRepository
                        .findById(noteId)
                        .orElse(null);


        if(note==null){
            return "Note not found";
        }




        Attachment attachment=
                new Attachment();

        attachment.setFileName(
                file.getOriginalFilename()
        );

        attachment.setFileType(
                file.getContentType()
        );


/*
save relative path in DB
*/
        attachment.setFilePath(
                "uploads/"
                        +
                        fileName
        );


        attachment.setNote(
                note
        );



        attachmentRepository.save(
                attachment
        );



        System.out.println(
                "File saved: "
                        +
                        fileName
        );


        return
                "File uploaded successfully";

    }






    @GetMapping("/{noteId}")
    public List<Attachment> getFiles(
            @PathVariable Long noteId
    ){

        List<Attachment> files=
                attachmentRepository
                        .findByNoteId(
                                noteId
                        );


        System.out.println(
                "Files fetched: "
                        +
                        files.size()
        );

        return files;

    }

}