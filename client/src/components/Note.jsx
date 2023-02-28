import React, { useState } from "react";
import Editnote from "./Editnote";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {
  const [editclicked, seteditclicked] = useState(false);
  const [editedNote, setEditedNote] = useState({
      Edtitle:props.NoteTitle,
      Edcontent:props.NoteMessage
  });
  let user = JSON.parse(sessionStorage.getItem('token'));
  const token = user.token;
  function editNote(newEnote, EditId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ ...newEnote,id:EditId }),
    };
    fetch("http://localhost:4000/api/notes/user/editnote", requestOptions)
    .then((res) =>res.json())
    .then((jsondata) => {
      setEditedNote((prev)=>{
        return({
          ...prev,
          Edtitle:newEnote.title,
          Edcontent:newEnote.content
        });
      });
      seteditclicked(false);
    });
  }
  return (
    <div className="note">
      {editclicked ? (
        <Editnote
          Etitle={editedNote.Edtitle}
          Econtent={editedNote.Edcontent}
          Eid={props.id}
          edit={editNote}
        />
      ) : (
        <div>
          <h1>{editedNote.Edtitle}</h1>
          <p>{editedNote.Edcontent}</p>
          <button
            onClick={() => {
              props.del(props.id);
            }}
          >
          <DeleteIcon />
          </button>
          <button
            onClick={() => {
              seteditclicked(true);
              console.log("clicked");
            }}
          >
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
