// 6-job_creator.js
import Kue from 'kue';

// Create a queue
const queue = Kue.createQueue();

// Define a job
const jobData = {
  phoneNumber: '1234567890',
  message: 'Notification job created'
};

// Create the job
const job = queue.create('push_notification_code', jobData).save(function(err) {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  } else {
    console.log('Notification job creation failed:', err);
  }
});

// Job completed
job.on('complete', function() {
  console.log('Notification job completed');
  job.remove();
});

// Job failed
job.on('failed', function(err) {
  console.log('Notification job failed:', err);
});

