import kue from 'kue';
import redis from 'redis';
import { promisify } from 'util';

const queue = kue.createQueue();
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100);
    
    if (blacklistedNumbers.includes(phoneNumber)) {
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
}

queue.process('push_notification_code_2', 2, (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
    job.progress(100);
    done();
});

queue.on('job complete', (id) => {
    console.log(`Notification job ${id} completed`);
}).on('job failed', (id, err) => {
    console.error(`Notification job ${id} failed: ${err.message}`);
});

