// 5-subscriber.js
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

// Subscribe to the channel
client.subscribe('ALXchannel', function(err) {
  if (err) {
    console.error('Failed to subscribe:', err);
  }
});

// Listen for messages
client.on('message', function(channel, message) {
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  } else {
    console.log(message);
  }
});

