import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
const host = "https://mern-notebook.netlify.app/"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const getallnodes = async () => {

    //console.log("before fetching:",notes)
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'auth-token' :localStorage.getItem('token')
              }
        });

        const tempnotes = await response.json();
       // console.log(tempnotes)
        setNotes(tempnotes)

       //console.log("after fetching:",tempnotes)

}

  const addNote = async (title, description, tag) => {
   
   // console.log(notes)
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token' :localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });

   
    
    const json = await response.json();
//console.log(response)
    // console.log(json)
   
   // console.log("adding a new node")
    const note = {
      "_id": json.savednote._id,
      "user": json.savednote.user,
      "title":json.savednote.title,
      "description": json.savednote.description,
      "tag": json.savednote.tag,
      "date": json.savednote.date,
      "__v": json.savednote.__v
    }
    //console.log(note)
    setNotes(notes.concat(note))
  }



  const editNote = async (id, title, description, tag) => {
  
    const bodyjson =  JSON.stringify({ title, description, tag })

    //console.log(bodyjson)
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      },
      body:bodyjson
    });
  
  //console.log({"JSONS BODY":JSON.stringify(title,description,tag)})

  const json = await response.json();

  console.log("json : ",json.UTC)

let newnotes = [...notes]
  for (let index = 0; index < newnotes.length; index++) {
    const element = newnotes[index];
    if (element._id === id) {
      newnotes[index].title = title;
      newnotes[index].description = description;
      newnotes[index].tag = tag;
      break;
    }
   
  }
  setNotes(newnotes)
}

const deleteNote = async (id) => {

  const url = `${host}/api/notes/deletenote/${id}`
 //console.log(url)
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      'auth-token' :localStorage.getItem('token')
    }
  });

const json = await response.json();

console.log(json.UTC)

  setNotes(notes.filter(note => note._id !== id));

}

return (
  <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote,getallnodes}}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState;