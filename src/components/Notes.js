import React, { useContext, useEffect, useRef,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getallnodes,editNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
         {   
            //console.log(localStorage.getItem('token'))
            getallnodes();
         }
         else
         {
            navigate("/login");
         }
        
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note,setnote]=  useState({id:"",etitle:"",edescription:"",etag:""})

    
    const updateNote = (currentNote) => {
        ref.current.click();
       // console.log(currentNote)
      setnote({
        id:currentNote._id,
        etitle:currentNote.title,
        edescription : currentNote.description,
        etag:currentNote.tag
    });

    }

    const handleClick=(e)=>{
        //console.log("updating the note...",note)
        editNote(note.id, note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("updated successfully","success");
     
    }

    const onChange=(e)=>{
       setnote({
        ...note,
        [e.target.name]:e.target.value
       })
    }
  


    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" 
          id="etitle" name="etitle" value={note.etitle} minLength={3} required onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" 
          id="edescription" value={note.edescription} minLength={3} required name="edescription" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" value={note.etag}
          id="etag" name="etag" minLength={3} required onChange={onChange}/>
        </div>
      </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<3 || note.edescription.length<3 || note.etag.length<3} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                    {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                    ))
                ) : (
                    <p>No notes available</p>
                )}
            </div>
        </>
    );
}

export default Notes;
