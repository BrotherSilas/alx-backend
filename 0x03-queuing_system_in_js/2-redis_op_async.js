import { createClient } from 'redis';

const client = createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});

await client.connect(); // Explicit connection step for Redis 4.x

async function setNewSchool(schoolName, value) {
    try {
        const reply = await client.set(schoolName, value);
        console.log(`Reply: ${reply}`);
    } catch (err) {
        console.error(`Error setting key: ${err}`);
    }
}

async function displaySchoolValue(schoolName) {
    try {
        const value = await client.get(schoolName);
        console.log(value);
    } catch (err) {
        console.error(`Error getting key: ${err}`);
    }
}

await displaySchoolValue('ALX');
await setNewSchool('ALXSanFrancisco', '100');
await displaySchoolValue('ALXSanFrancisco');

await client.quit(); // Close connection when done

