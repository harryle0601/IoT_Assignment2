const functions = require('firebase-functions');
const admin = require('firebase-admin');



exports.issueNew = functions.firestore
.document('issues/{issuesId}')
.onCreate((snap, context) => {
  const issue = snap.data();
 return admin.firestore().collection('mail').add({
    to: "vthanhquang72882@gmail.com",
    message: {
      subject: issue.Sumary,
      html: "Hello Engineers, A Car "+issue.Car.Brand+issue.Car.Model+" has been reported for issue of "+issue.Description+" at" +issue.Latitude?issue.Latitude:"10.7296"+", "+issue.Longitude?issue.Longitude:"106.6931"+". Please anrrange come to diagnosis and fix the issue of the car. If there is any help or further instructions needed, please contact reca.admin@reca.com.",
    },
  })
    .then(() => console.log('email sent'))
    .catch(err => console.log(err))

});