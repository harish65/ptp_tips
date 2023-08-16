var mysql= require('mysql2');
let config = require("./config");
  const connection = mysql.createConnection({
    host: config.config.HOST2,
    port: config.config.PORT2,
    user: config.config.USER2,
    password: config.config.PASSWORD2,
    database: config.config.DB2,
    multipleStatements: config.config.multipleStatements ,
    dateStrings:true,  
  })

  connection.connect( (error) => {
    if(error){
      console.log('Error connecting2 to the database of PTP TIPS' + error);
    }else{
        console.log('===============================================================');
        console.log('>>> ⚙️ Successfully connected2 to the database of PTP TIPS.');
        console.log('===============================================================');
    }
    return connection
  })

  module.exports = connection;