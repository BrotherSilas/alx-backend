// 6-job_processor.js
import kue from 'kue';

// Create a queue with Kue
const queue = kue.createQueue();

// Blacklisted phone numbers
const blacklisted = ['4153518780', '4153518781'];

// Function to send notification
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0);  // Start job progress at 0%

  // Check if the phone number is blacklisted
  if (blacklisted.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    return done(error);
  }

  // Job progress to 50%
  job.progress(50);
  
  // Log the sending notification process
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  
  // Complete the job
  job.progress(100);
  done();
}

// Listen for new jobs on the queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

