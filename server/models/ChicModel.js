const { Pool } = require('pg');

// DATABASE URI
const PG_URI =
  'postgres://exrnrgfz:M7YcTwo_UAZ5eg6RLzOCvsrA_2fVjqB5@suleiman.db.elephantsql.com/exrnrgfz';

const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed Query: ', text);
    return pool.query(text, params, callback);
  },
};
