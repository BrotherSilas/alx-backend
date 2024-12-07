// 7-job_creator.js
import kue from 'kue';

// Create a queue with Kue
const queue = kue.createQueue();

// List of jobs to create
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Loop through the jobs array and create jobs in the queue
jobs.forEach((jobData) => {
  const job = queue.create('push_notification_code_2', jobData)
    .on('complete', (id) => {
      console.log(`Notification job ${id} completed`);
    })
    .on('failed', (id, error) => {
      console.log(`Notification job ${id} failed: ${error}`);
    })
    .on('progress', (id, percentage) => {
      console.log(`Notification job ${id} ${percentage}% complete`);
    });

  job.save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`);
  });
});

