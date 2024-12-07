import { expect } from 'chai';
import kue from 'kue';
const queue = kue.createQueue();
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
    beforeEach(() => {
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs({}, queue)).to.throw(Error, 'Jobs is not an array');
    });

    it('should create two new jobs in the queue', (done) => {
        const jobs = [
            { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
            { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
        ];

        createPushNotificationsJobs(jobs, queue);

        queue.testMode.processAll(() => {
            const jobIds = queue.testMode.jobs.map(job => job.id);
            expect(jobIds.length).to.equal(2);
            expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
            expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
            done();
        });
    });
});

