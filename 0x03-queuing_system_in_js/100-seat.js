import express from 'express';
import kue from 'kue';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const queue = kue.createQueue();
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const reservationEnabled = true;
let availableSeats = 50;

async function getCurrentAvailableSeats() {
    return await getAsync('available_seats');
}

function reserveSeat(number) {
    return setAsync('available_seats', number);
}

app.get('/available_seats', async (req, res) => {
    const seats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: seats });
});

app.get('/reserve_seat', (req, res) => {
    if (!reservationEnabled) {
        return res.json({ status: 'Reservations are blocked' });
    }

    const job = queue.create('reserve_seat', { seats: availableSeats })
        .save(err => {
            if (err) {
                return res.json({ status: 'Reservation failed' });
            }
            console.log(`Seat reservation job ${job.id} started`);
            res.json({ status: 'Reservation in process' });
        });

    job.on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`);
        availableSeats--;
        if (availableSeats === 0) {
            reservationEnabled = false;
        }
    }).on('failed', (err) => {
        console.error(`Seat reservation job ${job.id} failed: ${err.message}`);
    });
});

app.get('/process', async (req, res) => {
    console.log('Queue processing');
    queue.process('reserve_seat', async (job, done) => {
        const

