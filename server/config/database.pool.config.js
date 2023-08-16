
/**This class if for creating a pool connection maniely
 * for excessive quering when needed.
 */
let mysql = require("mysql2");
let mysqlPromise = require("mysql2/promise");
let config = require("./config");

let pool;
let con;

let db_config = {
  host: config.config.HOST,
  user: config.config.USER,
  password: config.config.PASSWORD,
  database: config.config.DB,
  connectionLimit: 200,
};

function getPoolPromise()
{
  let poolPromise = mysqlPromise.createPool(db_config);
  return poolPromise;
}



function createCon() {}

module.exports = {
  getPool: function () {
    if (pool) return pool;
    pool = mysql.createPool(db_config);
    return pool;
  },
  getPoolPromise,
  createCon: function () {
    if (con) return con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
      if (err) throw err;
      setTimeout(createCon, 2000);
    });
    con.on("error", function (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        createCon();
      } else {
        throw err;
      }
    });
    return con;
  },
};
