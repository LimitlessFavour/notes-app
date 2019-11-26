const yargs = require('yargs');
const notes = require('./notes');
const chalk = require('chalk');

yargs.version('1.1.0');

yargs.command({
    command : 'add',
    describe: 'Description- Add a new note',
    builder : {//parameters here.
        title : { //first parameter.
            describe : "The note title parameter",
            demandOption : true, //must be a required parameter.
            type: 'string', //type is a string by default.
        },
        body : { //second parameter.
          describe: "The second parameter-Challenge parameter",
          demandOption: true, //required parameter.
          type: 'string',
        },
    },
    handler : function notAnonymous(argv){ //argv is obtained from the builder.
        notes.addNoteDescription(argv.title,argv.body);
        console.log(chalk.bold.inverse("Title of new note is: "+ argv.title));
        console.log(chalk.bold.inverse("The body of the new note is "+ argv.body));
    }
});

yargs.command({
    command : 'remove',
    describe : 'Description - remove an existing note',
    builder : {//parameters here.
        title: { //first parameter
            describe: 'Title of note to be removed',
            demandOption: true,
            type: 'string',
        },
    },
    handler(args) { //ES6 function declaration.
        notes.removeNote(args.title,'notes.json'); //remove note
        console.log(chalk.inverse.bold("Removing note "+ args.title));
    }
});
yargs.command({
    command : 'list',
    describe : 'Listing the notes',
    handler: function listFunction() { //no Es6
    console.log(chalk.bold.inverse('Listing the notes'));
    notes.listNoteDescription('notes.json');
    }
});

yargs.command({
    command : 'read',
    describe : 'Read from a note',
    builder: {
        title:{
            describe: 'Title of note to be removed',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){ //ES6 method declaration.
       console.log(chalk.inverse.bold("Reading from note"));
       notes.readNote(argv.title,'notes.json');
    },
});
yargs.parse();
//console.log(yargs.argv);

