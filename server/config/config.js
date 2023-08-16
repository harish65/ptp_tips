var config = {
  // PORT: 3306,
  // NODE_ENV: 'development',
  // HOST: 'ptptipsnest1.cnpustzqmxl7.us-east-1.rds.amazonaws.com',
  // USER: 'admin',
  // PASSWORD: 'pastthepost_999',
  // DB: 'ptpTips',


  PORT: 3306,
  NODE_ENV: 'development',
  HOST: '44.204.164.117',
  USER: 'ptpteam',
  PASSWORD: 'ptpTips4422',
  DB: 'ptpTips',

  PORT2: 3306,
  NODE_ENV2: 'development',
  HOST2: '44.204.164.117',
  USER2: 'ptptipsdb',
  PASSWORD2: 'ptpTips4422',
  DB2: 'racecalc_cust_db',
  // 81
  // HOST : '81.171.3.119',
  // PASSWORD : '2Xd66eu*',
  // USER : 'ptptipsdb',
  // DB : 'ptptips_live',
  multipleStatements: true,

  // PORT : 3306,
  // HOST : '92.42.108.74',
  // USER : 'ptptipsdb',
  // PASSWORD : 'root',
  // DB : 'ptptips',
  // // multipleStatements: true ,
}

module.exports = {
  config: config,
  JWT_SECRET: 'PTPJwtSec',
};