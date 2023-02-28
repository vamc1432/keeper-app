import React from "react";
import DoneIcon from '@mui/icons-material/Done';

function Editnote(props) {
    const [enote, setenote] = React.useState({
        title: props.Etitle,
        content: props.Econtent
    });
    function handleEChange(e) {
        const { name, value } = e.target;
        setenote((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
  return (
    <div>
    <form className="create-note edit-note">
      <input
        onChange={handleEChange}
        name="title"
        value={enote.title}
        placeholder="Title"
        autoComplete="off"
      />
      <textarea
        onChange={handleEChange}
        name="content"
        value={enote.content}
        placeholder="Take a note..."
        rows="2"
      />
      <button onClick={(e)=>{
          props.edit(enote,props.Eid);
          e.preventDefault();
      }}>
      <DoneIcon />
      </button>
      </form>
    </div>
  );
}

export default Editnote;
