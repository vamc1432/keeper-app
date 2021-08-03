import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

function App() {
  var [notes, setnotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata))
      .catch((error) => {
        console.log(error);
      });
  },[]);
  function addNote(newNote) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    };
    fetch("http://localhost:4000/addnote", requestOptions)
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata));
  }
  function deleteNote(id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    fetch("http://localhost:4000/deletenote", requestOptions)
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata));
  }
  
  return (
    <div>
      <Header />
      <CreateArea add={addNote} />
      {notes.map((i, index) => {
        return (
          <Note
            key={index}
            id={i._id}
            NoteTitle={i.Ntitle}
            NoteMessage={i.Ncontent}
            del={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
