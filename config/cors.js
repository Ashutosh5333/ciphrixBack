const cors = require('cors')

module.exports = (originsEnv) => {
  if (originsEnv === "*" || !originsEnv) {
    return cors({
      origin: true,
      credentials: true,
      methods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type, Authorization",
    });
  }

  const whitelist = originsEnv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    preflightContinue: false,
    optionsSuccessStatus: 204, 
  });
};