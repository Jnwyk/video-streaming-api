const mongoose = require("mongoose");
const uri =
  "mongodb://jnwyk:QUf7hofT2YIgTIz4@ac-qzx0u2c-shard-00-00.svk3kmi.mongodb.net:27017,ac-qzx0u2c-shard-00-01.svk3kmi.mongodb.net:27017,ac-qzx0u2c-shard-00-02.svk3kmi.mongodb.net:27017/?ssl=true&replicaSet=atlas-pfkfa2-shard-0&authSource=admin&retryWrites=true&w=majority"; //uri to connect with db

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`Connected to ${connect.connection.host}`);

    connect.connection.on("error", () => "Database has been disconnected"); // if database disconnects during work of the server
  } catch (error) {
    console.log(error);
    process.exit(1); // if the server won't be able to connect with the db, end the program
  }
};

module.exports = connectDB;
