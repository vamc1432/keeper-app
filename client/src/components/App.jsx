import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

function App() {
  var [notes, setnotes] = useState([]);
  let user = JSON.parse(sessionStorage.getItem('token'));
  const token = user.token;
  const defheader = {
    "Content-Type": "application/json" ,
    "Authorization" : `Bearer ${token}`
    };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: defheader
    };
    fetch("http://localhost:4000/api/notes/user/getall",requestOptions)
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata))
      .catch((error) => {
        console.log(error);
      });
  },[]);
  function addNote(newNote) {
    const requestOptions = {
      method: "POST",
      headers: defheader,
      body: JSON.stringify(newNote),
    };
    fetch("http://localhost:4000/api/notes/user/addnote", requestOptions)
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata));
  }
  function deleteNote(id) {
    const requestOptions = {
      method: "POST",
      headers: defheader,
      body: JSON.stringify({ id }),
    };
    fetch("http://localhost:4000/api/notes/user/deletenote", requestOptions)
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
            key={i.Ntitle+index}
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
