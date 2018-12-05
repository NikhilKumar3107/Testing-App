import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from  'mongoose';

//importing the Issue model from the models folder
import Issue from './models/issues';

const app = express()
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

//URL to the MongoDatabase.
mongoose.connect('mongodb://127.0.0.1:27017/issues',{
  poolSize: 10
});

const connection = mongoose.connection;

//One time Event which lets us know that we are connected to the MongoDb
connection.once('open',() => {
  console.log('MongoDb db connection is estabished successfully!');
});

//Setting the end points using the Router

//This is GET request for all the issues.
router.route('/issues').get((req,res) => {
  Issue.find((err,issues) =>{
    if (err)
      console.log(err);
    else
      res.json(issues);
  });
});
//THis is a GET request for a specific issue by id.
router.route('/issues/:id').get((req,res) => {
  Issue.findById(req.params.id, (err,issue) => {
    if (err)
      console.log(err);
    else
      res.json(issue);
  });
});
//This is POST request to add issues
router.route('/issues/add').post((req,res) =>{
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).json({'issue':'Add Sucess'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});
//This is a POST request to update existing issues
router.route('/issues/update/:id').post((req,res) =>{
  Issue.findById(req.params.id, (err,issue) =>{
    if(!issue)
      return next(new Error('Could not load the document'));
    else{
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save()
        .then(issue =>{
          res.json('Update Done');
        })
        .catch(err => {
          res.status(400).send('Update Failed');
        });
      }
  });
});
//This is DELETE request to delete a issues
router.route('/issues/delete/:id').get((req,res) => {
  Issue.findByIdAndRemove({_id: req.params.id}, (err,issue) =>{
    if(err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});


//Attaching the router to the application
app.use('/',router);

//URL of the server app
app.listen(3000, () => console.log('http://localhost:3000/'));
