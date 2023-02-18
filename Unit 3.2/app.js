const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/";
const DATABASE_NAME = "Players";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    mongodb();
});

// rest end points 
app.post("/addNewPlayer", (request, response) => {
    collection.insert(request.body, (error, result)  => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    })
});

app.get("/playersAll", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    })
});

app.get("/players/:id", (request, response) => {
    collection.findOne({"_id" : new ObjectId(request.params.id)}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    })
})

app.put("/players/:id", (request, response) => {
     collection.findByIdAndUpdate({"_id" : new ObjectId(request.params.id)}, request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error)
        }
        response.send(result);
     })
})


app.delete("/players/delete/:id", (request, response) => {
    collection.findByIdAndRemove({"_id" : new ObjectId(request.params.id)}).then(player => {
        if(!player) {
            return response.status(404).send({message: "Player not found with id " + request.params.id});
        }
        response.send({message:  "player deleted successfully!"})
    })
})


async function mongodb() {
   let client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error) => {
        if(error) {
            throw error;
        }

    });

    database = client.db(DATABASE_NAME);
    collection = database.collection("personnel");
    console.log("Connected to `" + DATABASE_NAME + "`!");
}
