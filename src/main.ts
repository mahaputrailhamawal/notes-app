import { fetchData } from "./libs/fetch";
import { Note } from "./types/entity";

interface NoteResult {
  data: Note[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/efN4msPKOFyC";

const noteForm = document.getElementById('note-form') as HTMLFormElement;
const noteTitle = document.getElementById('note-title') as HTMLInputElement;
const noteContent = document.getElementById('note-content') as HTMLTextAreaElement;
const notesList = document.getElementById('notes-list') as HTMLDivElement;

async function renderNotes() {
  const notes = await fetchData<NoteResult>(API_URL);
  
  if (!notes) {
    console.log("Aplikasi error!");
    return;
  }

  const noteTemplate = document.getElementById('note-template') as HTMLTemplateElement;

  notes.data.forEach((note) => {
    const noteElement = noteTemplate.content.cloneNode(true) as HTMLElement;
    const titleElement = noteElement.querySelector('.note-title') as HTMLHeadingElement;
    const contentElement = noteElement.querySelector('.note-content') as HTMLParagraphElement;
    const deleteButton = noteElement.querySelector('.delete-btn') as HTMLButtonElement;

    titleElement.textContent = note.title;
    contentElement.textContent = note.content;
    deleteButton.dataset.id = note._id;

    notesList.appendChild(noteElement);
  });
}

noteForm.addEventListener("submit", async () => {
  const title = noteTitle.value;
  const content = noteContent.value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, content }]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
});

notesList.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('delete-btn')) {
    const noteId = target.getAttribute('data-id');
    console.log(`Note dengan ID ${noteId}`);
    if (noteId) {
      try {
        await fetch(API_URL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([noteId]),
        });

      } catch (error) {
        console.log(error);
      } finally {
        window.location.reload();
      }
    }
  }
});

// Initial render
renderNotes();