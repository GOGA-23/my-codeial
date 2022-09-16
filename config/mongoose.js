const mongoose =require('mongoose');

main().catch(err => console.log(err));
const db = mongoose.connection;
async function main(){
  await mongoose.connect("mongodb://localhost/codeial_development");
  console.log("successfully connected to the database ");
}

module.exports = db;