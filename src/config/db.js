const dev = process.env.NODE_ENV;

let MYSQL_CONF, REDIS_CONF;

if (dev === "dev") {
  MYSQL_CONF = {
    host: "sssss",
    user: "root",
    password: "ssssss",
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
    host: "ssssss",
    user: "root",
    password: "ssssss",
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
