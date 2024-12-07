// 5-publisher.js
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Connect to Redis server
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

// Handle errors
client.on('error', function(err) {
  console.log('Redis client not connected to the server:', err);
});

// Function to publish a message
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('ALXchannel', message);
  }, time);
}

// Test cases
publishMessage('ALX Student #1 starts course', 100);
publishMessage('ALX Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('ALX Student #3 starts course', 400);

