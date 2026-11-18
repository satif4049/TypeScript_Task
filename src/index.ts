class User {
  private user: { id: number; name: string; noteBooks: NoteBook[] }[] = [];
  constructor(
    public id: number,
    public name: string,
    public email: string,
    private _password: string,
    protected phone: string,
    public age: number,
    public noteBooks: NoteBook[],
  ) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this.user.push({ id, name, noteBooks });
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }
  addNoteBook(noteBook: NoteBook) {
    this.noteBooks.push(noteBook);
  }
  displayInfo(): void {
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
  public notes: Note[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    _password: string,
    phone: string,
    age: number,
    noteBooks: NoteBook[],
  ) {
    super(id, name, email, _password, phone, age, noteBooks);
  }

  addNotes(note: Note): void {
    this.notes.push(note);
  }

  removeNotes(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  displayNotes(): void {
    console.log(this.notes);
  }
}

class Note {
  constructor(
    public id: number,
    public content: string,
    public title: string,
    public userId: User,
  ) {}

  public preview(): string {
    return this.content.substring(0, 30) + "...";
  }
}

class NoteBook {
  constructor(public notes: Note[]) {}
  addNote(note: Note) {
    this.notes.push(note);
  }
  removeNote(id: number) {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}

class Storage<T> {
  private items: T[] = [];
  addItem(item: T) {
    this.items.push(item);
  }
  removeItem(item: T) {
    this.items = this.items.filter((i) => i !== item);
  }
  getAllItems(): T[] {
    return this.items;
  }
}

const user1 = new User(
  1,
  "sara",
  "sara@gmail.com",
  "2020",
  "0103256987",
  20,
  [],
);
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

const admin1 = new Admin(
  2,
  "Ahmed",
  "admin@gmail.com",
  "admin123",
  "01112345678",
  30,
  [],
);
admin1.addNotes(note1);

admin1.addNotes(note2);

admin1.displayNotes();

admin1.removeNotes(1);

admin1.displayNotes();

const storage1 = new Storage<Note>();

storage1.addItem(note1);

storage1.addItem(note2);

console.log(storage1.getAllItems());

storage1.removeItem(note1);

console.log(storage1.getAllItems());