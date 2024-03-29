import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom } from '@mui/material';

function CreateArea(props) {
  var [ipnote, setipnote] = useState({
    title: "",
    content: ""
  });
  var [taclick,settaclick] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setipnote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function Add(e) {
    props.add(ipnote);
    setipnote({
      title: "",
      content: ""
    });
    e.preventDefault();
  }

  function handleClick(){
    settaclick(true);
  }
  return (
    <div >
      <form className="create-note" action="../../note" method="POST">
        {taclick && <input
          onChange={handleChange}
          name="title"
          value={ipnote.title}
          placeholder="Title"
        />}
        <textarea
          onClick={handleClick}
          onChange={handleChange}
          name="content"
          value={ipnote.content}
          placeholder="Take a note..."
          rows={taclick ? "3":"1"}
        />
        <Zoom in={taclick ? true:false}>
        <Fab onClick={Add}>
        <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
