# Redis Queuing System in Node.js

## Description
This project demonstrates a simple Redis-based queuing system implemented using Node.js and Babel. It showcases various Redis operations, including basic commands, hash storage, async handling, pub/sub, and job creation using `kue`.

---

## Requirements
- **Environment**: Ubuntu 18.04, Node.js 12.x, Redis 5.0.7+
- **Tools**: Babel, npm, redis, kue
- **Mandatory Files**:
  - `README.md`
  - `package.json`
  - `.babelrc`

---

## Installation
1. **Install Redis**:
   ```bash
   $ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
   $ tar xzf redis-6.0.10.tar.gz
   $ cd redis-6.0.10
   $ make
   $ src/redis-server &
Install Node Modules:
bash
Copy code
$ npm install
Usage
Run the Redis Server
bash
Copy code
$ src/redis-server &
Run Project Scripts
Each task corresponds to a specific file. Use the following command to execute:
bash
$ npm run dev <script_name>.js

Features
Basic Redis Operations:
Set and get key-value pairs.
Async Operations:
Use async/await for Redis commands.
Advanced Hash Operations:
Store and retrieve complex objects.
Publisher/Subscriber:
Create pub/sub channels for communication.
Job Queue:
Implement job queuing with kue.
Example
Publish/Subscribe
Run the subscriber:
bash
$ npm run dev 5-subscriber.js
Run the publisher:
bash
$ npm run dev 5-publisher.js

Author
Silas Edet

