// 8-job.js
import kue from 'kue';

// Create the job creation function
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
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
}

export default createPushNotificationsJobs;

