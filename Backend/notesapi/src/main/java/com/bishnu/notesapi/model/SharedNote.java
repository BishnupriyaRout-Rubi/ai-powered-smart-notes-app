package com.bishnu.notesapi.model;

import jakarta.persistence.*;

@Entity
public class SharedNote {

    @Id
    @GeneratedValue(
            strategy=
                    GenerationType.IDENTITY
    )
    private Long id;


    @ManyToOne
    @JoinColumn(
            name="note_id"
    )
    private Note note;


    @ManyToOne
    @JoinColumn(
            name="owner_id"
    )
    private User owner;


    @ManyToOne
    @JoinColumn(
            name="collaborator_id"
    )
    private User collaborator;


    private String permission="EDIT";



    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }


    public Note getNote(){
        return note;
    }

    public void setNote(Note note){
        this.note=note;
    }


    public User getOwner(){
        return owner;
    }

    public void setOwner(User owner){
        this.owner=owner;
    }


    public User getCollaborator(){
        return collaborator;
    }

    public void setCollaborator(
            User collaborator
    ){
        this.collaborator=
                collaborator;
    }


    public String getPermission(){
        return permission;
    }

    public void setPermission(
            String permission
    ){
        this.permission=
                permission;
    }

}