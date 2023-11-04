const mongoose = require('mongoose');


const db = async() => {
    try{
       let result=await mongoose.connect(process.env.DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true}
        );
        console.log("Database connected!");
    }catch(error){
        console.log(`Couldn't connect ${error}`);

    }
};

module.exports = db;