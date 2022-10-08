import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
// Schema
const entrySchema = mongoose.Schema({
    subject:   { type: String, require: true },
    summary:  { type: String, require: true },
});

const loginSchema = mongoose.Schema({
    username:   { type: String, require: true },
    password:  { type: String, require: true },
});
// Compile the model from schema
const Entry = mongoose.model("Entry", entrySchema);
const Login = mongoose.model("Login", loginSchema);

const createEntry = async (subject, summary) => {
    const entry = new Entry({ subject: subject, summary: summary })
    return entry.save()
}

const createLogin = async (username, password) => {
    const login = new Login({ username:username, password: password })
    return login.save()
}


const returnEntries = async (filter) => {
    const query = Entry.find(filter)
    return query.exec()
}

const returnLogin = async (filter) => {
    const query = Login.find(filter)
    return query.exec()
}

const updateEntry = async (filter, update) => {
    const result = await Entry.updateOne(filter,update);
    return result.modifiedCount;
}

const deleteEntry = async (filter) => {
    const result = await Entry.deleteMany(filter);
    return result.deletedCount;
}

const deleteLogin = async (filter) => {
    const result = await Login.deleteMany(filter);
    return result.deletedCount;
}
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createEntry, returnEntries, updateEntry, deleteEntry, createLogin, returnLogin, deleteLogin}