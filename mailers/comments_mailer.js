const nodeMailer = require('../config/nodemailer')

exports.newComment = (comment)=>{

    let htmlString = nodeMailer.renderTemplate({comment : comment}, "/comments/new_comment.ejs");

  nodeMailer.transporter.sendMail({
    from: "gokulgandhi@gmail.com",
    to : comment.user.email,
    subject : "New Post and Comment Published",
    html : htmlString
  },(err,info)=>{
    if(err){
      console.log("error in sending mail", err);
      return;
    }
    console.log("message sent", info);
    return; 
  });
}