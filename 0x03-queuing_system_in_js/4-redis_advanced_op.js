import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Connect to Redis server
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

// Create a hash in Redis
const data = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

// Store the hash values
for (const [key, value] of Object.entries(data)) {
  client.hset('ALX', key, value, redis.print);
}

// Retrieve the hash
client.hgetall('ALX', (err, obj) => {
  if (err) {
    console.log('Error fetching data:', err);
  } else {
    console.log(obj);
  }
  client.quit();
});

