import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NotesService } from '../services/notes.service';



@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  note:Note;
  notes:Note[]=[];

  errMessage:string;
  constructor(private notesservice:NotesService) {
    this.note=new Note();
  }

  ngOnInit(){
    this.notesservice.getNotes().subscribe(res=>{
      // console.log(res);
      
      this.notes=res;      
    },
    err=>this.errMessage=err.message)
  }

  submit(){

    if(this.note.text===""||this.note.title==="" || !this.note.text || !this.note.title)
    { 
      this.errMessage="Title and Text both are required fields";
      return;
    }

    this.notesservice.addNote(this.note)
    .subscribe(
      resp=>{},
      err=>this.errMessage=err.message
    )
  }



}
