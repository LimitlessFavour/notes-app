const fs = require('fs');
const chalk = require('chalk');

const addNote = function nameItAdd(title, body) { //requires both title and body of file to be added.
    //first,load the existing note object.
    const notes = loadNote('notes.json');
    console.log(notes);
    //now we've obtained existing info of the document,we add new info

    //but we first check to see if note title is unique.

    //obtain duplicate notes.
    //this obtains all duplicate notes.
    const duplicateNotes = notes.filter((note)=> {
        return note.title === title;
    });
    //this obtains a boolean of true  if a duplicate note is present.
    const duplicateNotesSingular = notes.find((note)=> note.title ===title);

    //continue if there are no duplicate notes.
    if (!duplicateNotesSingular) {
        notes.push({ //an instance of data added to the note object.
                title: title,
                body: body,
            }
        );
        //we can then save the note and notify user.
        saveNotes('notes.json', notes);
        console.log("New note added");
    }else { //duplicate notes found.
        console.log("Note title exists")
    }
};

const removeNote = function removeFunction(objectTitle,filePath) {
    //loading the existing note
    const notes = loadNote(filePath);
    console.log(notes);

    //obtain  notes having the objectTitle title.
    const notesToKeep = notes.filter(function (note) {
        return note.title !== objectTitle; //keeps only notes without names = obJectTitle in notesKeep
    });
    saveNotes('notes.json',notesToKeep); //we can now save the new array

};

const listNote = (filepath)=> {
    const notes = loadNote(filepath);
    console.log(notes);
    // notes.forEach((eachNote)=>{
    //     console.log(eachNote.title);
    // });
};

const saveNotes = function (filePath, argObject) { //argument and file to save new info to.
    const notesJSON = JSON.stringify(argObject);
    fs.writeFileSync(filePath, notesJSON); //since we've loaded previously,this wont overwrite the existing info.
};


const loadNote = function (filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON); //returns the object
    } catch (e) {
        //if it fails it definitely means the file doesnt exist.
        //so we create the new file with empty list passed on to it.
        return []
    }
};
const readNote = function(objectTitle,filePath){
    const notes = loadNote(filePath);
    const requiredNote = notes.find((note)=> note.title ===objectTitle);
    if(!requiredNote){
        return console.log(chalk.inverse.red("error.file not found."));
    }else{
        const requiredNoteTitle = chalk.inverse.green(requiredNote.title);
        const requiredNoteBody = requiredNote.body;
      return console.log(requiredNoteTitle+ "\n"+ requiredNoteBody);
    }
};

//functions to be exported.
module.exports = {
    addNoteDescription: addNote,
    removeNote : removeNote,
    listNoteDescription: listNote,
    readNote: readNote,
};