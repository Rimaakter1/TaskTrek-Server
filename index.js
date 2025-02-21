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





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://task62:Pj0rjghlaNZHybzV@cluster0.whq23.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const db = client.db('taskTrek')
        const usersCollection = db.collection('users')
        const tasksCollection = db.collection('tasks')

        app.post('/users/:email', async (req, res) => {
            const email = req.params.email
            const query = { email }
            const user = req.body
            const isExist = await usersCollection.findOne(query)
            if (isExist) {
                return res.send(isExist)
            }
            const result = await usersCollection.insertOne({
                ...user,
                timestamp: Date.now(),
            })
            res.send(result)
        })


        app.post('/tasks', async (req, res) => {
            const task = req.body
            const result = await tasksCollection.insertOne(task)
            res.send(result)
        })

        app.get("/tasks/:email", async (req, res) => {
            const userEmail = req.params.email;
            const tasks = await tasksCollection.find({ email: userEmail }).toArray();
            res.send(tasks);

        });

        app.put('/tasks/:id', async (req, res) => {
            const { title, description, category } = req.body;
            const taskId = req.params.id;
            const updatedTask = await tasksCollection.updateOne(
                { _id: new ObjectId(taskId) },
                { $set: { title, description, category } }
            );
            const taskAfterUpdate = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
            res.send(taskAfterUpdate);

        });



        app.put('/task/reorder', async (req, res) => {
                const { taskId, newCategory, newIndex } = req.body;
                const result = await tasksCollection.updateOne(
                    { _id: new ObjectId(taskId) },
                    { $set: { category: newCategory, order: newIndex } }
                );

                res.send(result);
           
        });




        app.delete('/tasks/:id', async (req, res) => {
            const taskId = req.params.id;
            const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
            res.send(result);

        });

        app.get('/', async (req, res) => {
            res.send('heelo')
        })
        await client.db("admin").command({ ping: 1 });
    } finally {
    }
}
run().catch(console.dir);









app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})