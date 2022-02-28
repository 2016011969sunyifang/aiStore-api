const dev = process.env.NODE_ENV;

let MYSQL_CONF, REDIS_CONF;

if (dev === "dev") {
  MYSQL_CONF = {
    host: "106.14.196.158",
    user: "root",
    password: "04bf828a99fbb4d8",
    port: "3306",
    database: "takeoutstore",
  };

  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}
if (dev === "production") {
  MYSQL_CONF = {
    host: "106.14.196.158",
    user: "root",
    password: "04bf828a99fbb4d8",
    port: "3306",
    database: "takeoutstore",
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
