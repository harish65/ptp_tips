var connection = require('../../config/database.config.js');
var moment = require("moment-timezone");


exports.recordEmailSent = async (mailNbr, type) => {

    let todayDate = moment().tz('Australia/Sydney').format('YYYY-MM-DD');

    let fetchEmailSQL = `SELECT * FROM emails_stat WHERE DATE(e_date) = '${todayDate}' AND type = '${type}';`;
    console.log(fetchEmailSQL);
    connection.query(fetchEmailSQL, function (error, results, fields) {
        if (error) {
            console.log('Error fetching email stat :' + error)
        }
        else {
            if (results.length > 0) {
                let incMaiNumber = Number(results[0].nbr_sent) + Number(mailNbr);
                let sql = `UPDATE emails_stat SET nbr_sent = '${incMaiNumber}' WHERE id = '${results[0].id}'`;
                console.log(sql);
                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        console.log('Error updating email stat :' + error)
                    }
                    else {
                        console.log('updated successfully')
                    }
                })
            } else {

                let today = moment().tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss');
                let sql = `INSERT INTO emails_stat (e_date, type, nbr_sent) VALUES ('${today}', '${type}', '${mailNbr}');`;
                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        console.log('Error updating email stat :' + error)
                    }
                    else {
                        console.log('updated successfully')
                    }
                })

            }
        }
    });
}


exports.recordUnsentEmail = async (clientEmail, type) => {

    let today = moment().tz('Australia/Sydney').format('YYYY-MM-DD');

    let fetchEmailSQL = `SELECT * FROM emails_stat WHERE DATE(e_date) = '${today}' AND type = '${type}';`;
    console.log(fetchEmailSQL);
    connection.query(fetchEmailSQL, function (error, results, fields) {
        if (error) {
            console.log('Error fetching email stat :' + error)
        }
        else {
            if (results.length > 0) {
                let failure = "";
                if(results[0].failure && results.failure !== ""){
                    failure = results[0].failure+", "+clientEmail;
                }else{
                    failure = clientEmail;
                }
                let sql = `UPDATE emails_stat SET failure = '${failure}' WHERE id = '${results[0].id}'`;
                console.log(sql);
                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        console.log('Error updating email stat :' + error)
                    }
                    else {
                        console.log('updated successfully')
                    }
                })
            }
        }
    });
}