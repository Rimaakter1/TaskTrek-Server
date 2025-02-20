const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const cookieParser = require('cookie-parser')
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionalSuccessStatus: 200,
}



app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://care39:IcHwRwGFh4NAb6rN@cluster0.whq23.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);









app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})