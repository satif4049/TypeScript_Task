"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    _password;
    phone;
    age;
    noteBooks;
    user = [];
    constructor(id, name, email, _password, phone, age, noteBooks) {
        this.id = id;
        this.name = name;
        this.email = email;
        this._password = _password;
        this.phone = phone;
        this.age = age;
        this.noteBooks = noteBooks;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this.user.push({ id, name, noteBooks });
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    addNoteBook(noteBook) {
        this.noteBooks.push(noteBook);
    }
    displayInfo() {
        console.log({
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            age: this.age,
        });
    }
}
class Admin extends User {
    notes = [];
    constructor(id, name, email, _password, phone, age, noteBooks) {
        super(id, name, email, _password, phone, age, noteBooks);
    }
    addNotes(note) {
        this.notes.push(note);
    }
    removeNotes(id) {
        this.notes = this.notes.filter((note) => note.id !== id);
    }
    displayNotes() {
        console.log(this.notes);
    }
}
class Note {
    id;
    content;
    title;
    userId;
    constructor(id, content, title, userId) {
        this.id = id;
        this.content = content;
        this.title = title;
        this.userId = userId;
    }
    preview() {
        return this.content.substring(0, 30) + "...";
    }
}
class NoteBook {
    notes;
    constructor(notes) {
        this.notes = notes;
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(id) {
        this.notes = this.notes.filter((note) => note.id !== id);
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
const user1 = new User(1, "sara", "sara@gmail.com", "2020", "0103256987", 20, []);
console.log({ user1 });
const note1 = new Note(1, "con", "titl", user1);
const note2 = new Note(2, "con", "titl", user1);
console.log({ note1, note2 });
const noteBook1 = new NoteBook([note1, note2]);
console.log(noteBook1);
noteBook1.addNote(note1);
noteBook1.addNote(note2);
console.log(noteBook1.notes);
noteBook1.removeNote(1);
console.log(noteBook1.notes);
user1.addNoteBook(noteBook1);
console.log(user1);
const admin1 = new Admin(2, "Ahmed", "admin@gmail.com", "admin123", "01112345678", 30, []);
admin1.addNotes(note1);
admin1.addNotes(note2);
admin1.displayNotes();
admin1.removeNotes(1);
admin1.displayNotes();
const storage1 = new Storage();
storage1.addItem(note1);
storage1.addItem(note2);
console.log(storage1.getAllItems());
storage1.removeItem(note1);
console.log(storage1.getAllItems());
