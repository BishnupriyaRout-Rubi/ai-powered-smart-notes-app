package com.bishnu.notesapi.model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Attachment {

    @Id
    @GeneratedValue(
            strategy=
                    GenerationType.IDENTITY
    )
    private Long id;


    private String fileName;

    private String fileType;

    private String filePath;



    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="note_id")
    private Note note;




    public Long getId(){
        return id;
    }

    public void setId(
            Long id
    ){
        this.id=id;
    }




    public String getFileName(){
        return fileName;
    }

    public void setFileName(
            String fileName
    ){
        this.fileName=fileName;
    }




    public String getFileType(){
        return fileType;
    }

    public void setFileType(
            String fileType
    ){
        this.fileType=fileType;
    }




    public String getFilePath(){
        return filePath;
    }

    public void setFilePath(
            String filePath
    ){
        this.filePath=filePath;
    }




    public Note getNote(){
        return note;
    }

    public void setNote(
            Note note
    ){
        this.note=note;
    }

}