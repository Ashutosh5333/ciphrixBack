
const cors = require('cors');

module.exports = (originsEnv) => {
  const whitelist = (originsEnv || '').split(',').map(s => s.trim()).filter(Boolean);
  return cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(whitelist.length === 0 || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
};
