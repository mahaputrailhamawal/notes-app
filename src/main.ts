import { fetchData } from "./libs/fetch.ts"
import { Note } from "./types/entity.ts"

interface NoteList {
  data : Note[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/efN4msPKOFyC";

async function renderNotes() {
  const notes = await fetchData<NodeList>(API_URL);

  if (!notes){
    console.log("Aplikasi error!");
    return;
  }
  
  notes.data.map((note) => {
    const newNote = document.createElement("div");
    const newTitleNote = document.createElement("h3");
    const newContentNote = document.createElement("p");

    newTitleNote.textContent = note.title;
    newContentNote.textContent = note.content;

    newNote.append(newTitleNote, newContentNote);
    document.body.append(newNote);
  });
}

const titleInput = document.getElementById("note-title") as HTMLInputElement;
const contentInput = document.getElementById("note-content") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submitBtn");

submitBtn?.addEventListener("click", async() => {
  const title = titleInput.value;
  const content = contentInput.value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, content}]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
})

renderNotes();