import mongoose from 'mongoose';

//Creating a database schema object
const Schema = mongoose.Schema;

//Initializing the database schema object
let Issue = new Schema({
  title: {
    type: String
  },
  responsible:{
    type: String
  },
  description:{
    type: String
  },
  severity:{
    type: String
  },
  Status:{
    type: String,
    default: 'Open'
  }
});

export default mongoose.model('Issue',Issue);
