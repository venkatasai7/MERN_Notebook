import React ,{useState,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'; 
const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    
    const[note,setnote]=  useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
       addNote(note.title,note.description,note.tag );
       setnote({title:"",description:"",tag:""})
       props.showAlert("added successfully","success");
    }

    const onChange=(e)=>{
       setnote({
        ...note,
        [e.target.name]:e.target.value
       })
    }

  return (
    <div className='container'>
            <h2> Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" 
          id="title" name="title" value={note.title} onChange={onChange} minLength={3} required rearia-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" 
          id="description"value={note.description} name="description" minLength={3} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" value={note.tag}
          id="tag" name="tag"  onChange={onChange}/>
        </div>

        <button disabled={note.title.length<3 || note.description.length<3}type="submit" className="btn btn-primary" 
        onClick={handleClick}
        >Submit</button>
      </form>

    </div>
  )
}

export default AddNote
