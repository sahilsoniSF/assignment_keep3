import { Injectable } from '@angular/core';
import { Note } from '../note';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private authService:AuthenticationService,
              private http:HttpClient
    ){
      this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }
  
  fetchNotesFromServer() {
    return this.http.get<Note[]>('http://localhost:3000/api/v1/notes',{
      headers:new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    })
    .subscribe(notes=>{
      this.notes=notes;
      this.notesSubject.next(this.notes);
    })
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(editedNote => {
      const existingNote = this.notes.find(noteValue => noteValue.id === editedNote.id);
      Object.assign(existingNote, editedNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(noteValue => noteValue.id === noteId);
    return Object.assign({}, note);
  }
}
