/* eslint-disable no-process-exit */
const fs = require('fs');
const assert = require('assert');
const sqlite = require('sqlite');
const log = require('./sqlogs');

const DB_PATH = './sqlogs.sqlite';

(async function() {
  try {
    await log('Hello, world!');
    let db = await sqlite.open(DB_PATH);

    let results = await db.all('SELECT * FROM logs');
    let logResult = results[0];

    assert.equal(logResult.id, 1);
    assert.equal(logResult.message, ' Hello, world!');
    assert.equal(logResult.group, 'DEFAULT');
    assert.equal(logResult.level, 'INFO');
    assert.equal(
      JSON.parse(JSON.stringify(new Date(logResult.timestamp))),
      logResult.timestamp
    );

    fs.unlinkSync(DB_PATH);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}());
