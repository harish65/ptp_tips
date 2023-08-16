var mysql=require('mysql2');
let config = require("./config");

const connection = mysql.createConnection({
    host: config.config.HOST,
    port: config.config.PORT,
    user: config.config.USER,
    password: config.config.PASSWORD,
    database: config.config.DB,
    multipleStatements: config.config.multipleStatements ,
    dateStrings:true,  
  })

  connection.connect( (error) => {
    if(error){
      console.log('Error connecting to the database of PTP TIPS' + error);
    }else{
        console.log('===============================================================');
        console.log('>>> ⚙️ Successfully connected to the database of PTP TIPS.');
        console.log('===============================================================');
    }
    return connection
  })

  module.exports = connection;