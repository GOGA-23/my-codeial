const mongoose =require('mongoose');
const env = require('../config/environment');

main().catch(err => console.log(err));
const db = mongoose.connection;
async function main(){
  await mongoose.connect(`mongodb://localhost/${env.db}`);
  console.log("successfully connected to the database ");
}

module.exports = db;