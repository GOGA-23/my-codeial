const queue = require('../config/kue');
const kue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');


queue.process('emails',(job, done)=>{
  console.log('emails worker is processing a job');

  commentsMailer.newComment(job.data);
  done();
});