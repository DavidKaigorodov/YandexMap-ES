const { Client } = require('pg');
const fs = require('fs');
const readline = require('readline');

// Настройки подключения к базе данных
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'elstation',
  password: 'root',
  port: 5432, // стандартный порт для PostgreSQL
});

async function insertDataFromFile(filePath, tableName) {
  try {
    await client.connect();
    console.log("Connected to the database.");
    
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      // Using a regex to split the line while keeping quoted strings intact
      const data = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

      if (data.length < 3) {
        console.error(`Incorrect data format in line: ${line}`);
        continue;
      }

      const id = parseInt(data[0], 10); // Parse id as a number
      const polygonWKT = data[1].replace(/"/g, '').trim(); // Remove quotes and trim whitespace
      const rating = parseFloat(data[2]); // Parse ratings as a float

      const insertQuery = `INSERT INTO przones (number, polygon, rating) VALUES ($1, ST_GeomFromText($2, 4326), $3)`;
      await client.query(insertQuery, [id, polygonWKT, rating]);

      console.log(`Inserted ID: ${id}, Polygon: ${polygonWKT}, Rating: ${rating} into ${tableName}`);
    }

    console.log("All data inserted successfully.");
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
    console.log("Disconnected from the database.");
  }
}

module.exports = {
  insertDataFromFile
};