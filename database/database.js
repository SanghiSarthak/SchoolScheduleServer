// hBkGhiL8phOKA11J

const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// const uri = 'mongodb+srv://srivastavluv007:LLXLKa8Xv1TRxnNl@cluster0.7g68lcx.mongodb.net/Timetable?retryWrites=true&w=majority&appName=Cluster0';
const uri = 'mongodb+srv://SarthakDB:Sarthak2212@atlascluster.yuh05si.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

// const uri = 'mongodb://127.0.0.1:27017/TimeTable'

let client;

async function connectToMongo() {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Error connecting to MongoDB', err));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function closeMongoConnection() {
    try {
        if (client) {
            // Close the connection
            await client.close();
            console.log('MongoDB connection closed');
        }
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
    }
}

module.exports = { connectToMongo, closeMongoConnection, };
