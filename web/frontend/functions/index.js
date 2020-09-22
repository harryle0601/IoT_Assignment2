const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const sendgridemail = require('@sendgrid/mail');
const MY_SENDGRID_API_KEY = "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"
sendgridemail.setApiKey(MY_SENDGRID_API_KEY);


exports.issueNew = functions.firestore
.document('issues/{issuesId}')
.onCreate((snap, context) => {

  const issue = snap.data();
  msgbody = {
    to: "vthanhquang72882@gmail.com",
    from: 'auto-no-reply@reca.com',
    templateId: 'd-c7f85eb631714add982b7ef77a07361c',
    "dynamic_template_data": {
      name: "Quang",
      text: "A Car "+issue.Car.Brand+issue.Car.Model+" has been reported for issue of "+issue.Description+" at" +issue.Latitude?issue.Latitude:"10.7296"+", "+issue.Longitude?issue.Longitude:"106.6931"+". Please anrrange come to diagnosis and fix the issue of the car. If there is any help or further instructions needed, please contact reca.admin@reca.com.",
      subject: issue.Sumary,
    }}
    return sendgridemail.send(msgbody)
    .then(() => console.log('email sent'))
    .catch(err => console.log(err))

});