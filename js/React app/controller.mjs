import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { createEntry, returnEntries, updateEntry, deleteEntry  } from './model.mjs';
import { createLogin, returnLogin, deleteLogin } from './model.mjs'; 
const app = express();

const PORT = process.env.PORT;
//--------------------------------------------------------------------------------------------------------
// Study Entry Functions
// Add study entry
app.get("/study", asyncHandler(async (req, res) => {
   const entry = await createEntry( req.query.subject, req.query.summary )
    res.send(entry);
}))
// Retrieve entries (To be displayed)
app.get("/retrieve", asyncHandler(async (req, res) => {
    const filter = {};
    if(req.query.subject !== undefined) {
        filter.subject = req.query.subject;
     }
     if(req.query.userId !== undefined) {   // Filter will use userId to retrieve only that user's entries.
        update.userId = req.query.userId;
    }
    const result = await returnEntries(filter);
    res.send(result);
}));
// Update an exisiting entry using its id
app.get("/update", asyncHandler(async (req, res) => {
    const update = {};
    if(req.query.subject !== undefined) {
        update.subject = req.query.subject;
     }
    if(req.query.summary !== undefined) {
     update.summary = req.query.summary;
     }
     if(req.query.userId !== undefined) {  // Filter will use userId and the parameters to update a user's entry.
        update.userId = req.query.userId;
    }
 
    update._id = req.query._id;

    const resultVal = await updateEntry({_id: req.query._id},  update);
    if (resultVal === 0) {
        res.send({ "Error" : "Not found"})
    }
    else {
    res.send({ numEntriesUpdated: resultVal })}
}));
// Delete an entry using its id
app.get("/delete" , asyncHandler(async (req, res) => {
    const deletion = {};
    if(req.query.subject !== undefined) {
        deletion.subject = req.query.subject;
     }
    if(req.query.summary !== undefined) {
     deletion.summary = req.query.summary;
     }
    if(req.query._id !== undefined) {
        deletion._id = req.query._id;
     }
    if(req.query.userId !== undefined) {  // Filter will use userId and the parameters to delete a user's entry.
        deletion.userId = req.query.userId;
    }
     const deletionVal = await deleteEntry(deletion);
     res.send({numOfDeletions: deletionVal})
 
}));

//--------------------------------------------------------------------------------------------------------
//Account Login Functions
app.get("/signup", asyncHandler(async (req, res) => {
    const login = await createLogin( req.query.username, req.query.password )
     res.send(login);
 }))

 app.get("/verifyLogin", asyncHandler(async (req, res) => {
    const filter = {};
    if(req.query.username !== undefined && req.query.password !== undefined ) {
        filter.username = req.query.username;
        filter.password = req.query.password;
     }
    const result = await returnLogin(filter);

    res.send(result);
}));

app.get("/deleteLogin" , asyncHandler(async (req, res) => {
    const deletion = {};
    if(req.query.username !== undefined) {
        deletion.username = req.query.username;
     }
 
    if(req.query.password!== undefined) {
     deletion.password = req.query.password;
     }
     if(req.query._id !== undefined) {
        deletion._id = req.query._id;
     }
   
     const deletionVal = await deleteLogin(deletion);
     res.send({numOfDeletions: deletionVal})
 
}));
//--------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});