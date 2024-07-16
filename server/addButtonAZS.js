const { Client } = require('pg');
const fs = require('fs');
const readline = require('readline');

// Настройки подключения к базе данных
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'elstation',
    password: 'root',
    port: 5432,
});

async function insertDataFromFile(filePath) {
    try {
        await client.connect();
        console.log("Connected to the database.");
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let lineNumber = 1;
        for await (const line of rl) {
            const data = line.split(',');

            if (data.length < 3) {
                console.error(`Incorrect data format in line ${lineNumber}: ${line}`);
                lineNumber++;
                continue;
            }

            const adress = data[0].replace(/"/g, '').trim();
            const latitude = parseFloat(data[1].replace(/"/g, ''));
            const longitude = parseFloat(data[2].replace(/"/g, ''));

            const insertQuery = `INSERT INTO stations (adress, latitude, longitude) VALUES ($1, $2, $3)`;
            await client.query(insertQuery, [adress, latitude, longitude]);

            console.log(`Inserted Adress: ${adress}, Latitude: ${latitude}, Longitude: ${longitude} into stations`);
            lineNumber++;
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
