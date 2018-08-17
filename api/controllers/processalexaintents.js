'use strict';

const date = new Date().getHours();
const dt = new Date();
//const month = todate.getUTCMonth() + 1; //months from 1-12
//const day = todate.getUTCDate();
const todatestr = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
var random = require('random-number-generator')


var mongoose = require('mongoose'),
blacklistcheck = mongoose.model('blacklist'),
audit = mongoose.model('audit'),
ciservice = mongoose.model('ciservice'),
transactions = mongoose.model('transactions'),
channel = mongoose.model('channel');

var {CustomerAccDetails} = require('../models/customer_Acc');
var {CustomerAuthDetails} = require('../models/Customer_auth');
var {beneficiaryDetails} = require('../models/beneficiarydetails');


var globalval ={};

exports.handleintents = function(req, resp) {
  console.log("Process Intent Start");
  //console.log(req.body);
   console.log('req body printed');
      var request = req;

      console.log("request>>>>>",request);
//console.log("Reques.context>>>>>",request.body.input.context);
//console.log("Reques.request>>>>>",request.body.input.request);

    //  request.body.input.sessionAttributes = request.body.input.sessionAttributes === null ? {} : request.body.input.sessionAttributes;

  //    request.body.input.sessionAttributes= {cifidd :123450};
  //    request.body.input.sessionAttributes.userFirstName="Aditya";
  //   console.log(typeof(request.body.input.sessionAttributes));
  //   console.log(typeof(request.body.input.requestAttributes));
  //   request.body.input.sessionAttributes.custuserid=2157056904312201;
  //   request.body.input.sessionAttributes.otp=111111;
     // request.body.input.sessionAttributes= {cifidd :123452};
     // request.body.input.sessionAttributes.userFirstName="Anitha";

//request.body.input.requestAttributes= {channelName :"twitter"};
//request.body.input.requestAttributes.auditid="5acaf13f9628f025a81de981";
//
//event.session.attributes = {auditid : '123', channelid : 'Alexa'};

 //  console.log(request.body.input.sessionAttributes.userFirstName);

     // request.sessionAttributes.custuserid=request.body.input.userId;
     //

//    var custuserid1=request.body.input.sessionAttributes.custuserid;

      //console.log(typeof(JSON.stringify(req.body.input)));
/////
var input = request.body.input;

function intentNamefuntion(a) {
  if (typeof(a.body) === "string") {
console.log("Inside IF");
    //console.log("JSON.parse(a.body) >>>>>>",JSON.parse(a.body));
    var bodydata = JSON.parse(a.body);
    console.log(bodydata.result.metadata.intentName);
    var bodyintent=bodydata.result.metadata.intentName;
    var intentName = bodyintent;
    return intentName;
  } else if (request.body.input.request!== undefined)  {
    console.log("Inside else IF");
        console.log("Reques.request>>>>>",request.body.input.request.intent.name);
        var intentName=request.body.input.request.intent.name;
        return (intentName);
  } else  {
      var intentName = request.body.input.currentIntent.name;
      return (intentName);
  }
}

console.log(input);
console.log(intentNamefuntion(input));

var intentName =intentNamefuntion(input);
//var requestAttributes =intentNamefuntion(input);
///

      //var intentName = request.body.input.currentIntent.name;
      console.log(`You Intent is :${intentName}`);
      var input = request.body.input;
      //console.log("input :>>>>>>>",input);
	  console.log("input :>>>>>>>");
	  console.log("input session attributes:>>>>>>>",input.session.attributes);
      
      var requestAttributes = input.session.attributes;
      //console.log("requestAttributes :>>>>>>>",requestAttributes.auditid.id);
	console.log(requestAttributes.auditid);
	//console.log(requestAttributes.auditid.id.toString());
      var auditid = requestAttributes.auditid;
      var auditModel;
      audit.find({_id : auditid},function(err,data){
		  if(err){
			  console.log('Mongodb find error');
			  console.log(err);
		  }
          auditModel = data[0];
		  console.log(auditModel);
        switch (intentName) {
          //// required

            case 'GreetingIntent':
                console.log('Entered GreetIntent Execution Block');
                handleGreetIntent(request, resp,auditModel);
                break;

          case 'LambdaNew':
                    console.log('Entered GreetIntent Execution Block');
                    handleLambdaNewIntent(request, resp,auditModel);
                    break;


            case 'CustACCIntent':
                console.log('Entered CustACCIntent Execution Block');
                handleCustACCIntent(request, callback);
                break;

            case 'CustAuthIntent':
                console.log('Entered CustAuthIntent Execution Block');
                handleCustAuthIntent(request, callback);
                break;

            case 'getotp':
                console.log('Entered GetCustAuthIntent Execution Block');
                handleGetCustAuthIntent(request, resp,auditModel);
                break;

            case 'genotp':
                console.log('Entered GetCustAuthIntent Execution Block');
                handlegenotpIntent(request, resp,auditModel);
                break;
			
			case 'transferRequest':
                console.log('Entered transferRequest Execution Block');
                handletransferRequest(request, resp,auditModel);
                break;
				
			case 'confirmTransferRequest':
                console.log('Entered transferRequest Execution Block');
                handleconfirmtransferRequest(request, resp,auditModel);
                break;
            case 'GetBalIntentnew':
                console.log('Entered GetBalIntent Execution Block');
                handleGetBalIntent(request, resp,auditModel);
                break;

		   case 'GetBalIntentnewS':
                console.log('Entered GetBalIntent Execution Block');
                handleGetBalIntentS(request, resp,auditModel);
                break;

		   case 'GetBalIntentnewC':
                console.log('Entered GetBalIntent Execution Block');
                handleGetBalIntentC(request, resp,auditModel);
                break;

            case 'getCustAccIntentnew':
                console.log('Entered getCustAccIntent Execution Block');
                handlegetCustAccIntent(request, resp,auditModel);
                break;

            case 'disconnectIntentnew':
                console.log('Entered disconnectIntent Execution Block');
                handledisconnectIntent(request, callback);
                break;


        /////////Not required



            case 'statementIntent':
                console.log('Entered statementIntent Execution Block');
                handlestatementIntent(request, resp,auditModel);
                break;

        ///////////////


            default:
                handleDefault(request, callback);
                break;
        }


      })
      console.log("auditid :>>>>>>>",auditid);



      // callback(null, 'Hello from Lambda');
  };


  ////////////////

//////////////

function handleGreetIntent(request, resp,auditModel) {
      console.log('Start handleGreetIntent');
//console.log("request>>>>>",request);
console.log("request>>>>>");
      var msg1 = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
      console.log('connect to Mongo Db server');
// console.log(typeof(request.body.input.sessionAttributes));
// console.log(typeof(request.body.input.requestAttributes));
    //  console.log('Token:', PAGE_ACCESS_TOKEN);
    //  https.get('https://graph.facebook.com/v2.6/' + request.userId + '?fields=first_name,last_name&access_token=' + PAGE_ACCESS_TOKEN,


        //  (res) => {
              // console.log('res:', res);
              // console.log('headers:', res.headers);
              // res.on('data', (d) => {
              //     console.log(d);
                //   request.body.input.sessionAttributes.userFirstName = JSON.parse(d).first_name;
                 //   request.body.input.sessionAttributes= {userFirstName :"Aditya"};
                 //
                 //  console.log(typeof(request.body.input.sessionAttributes));
                 //  console.log(typeof(request.body.input.requestAttributes));
                 // console.log(request.body.input.sessionAttributes.userFirstName);
                 //  request.body.input.sessionAttributes.custuserid=2157056904312202;
                 //
                 //   // request.sessionAttributes.custuserid=request.body.input.userId;
                 //   //
                 //
                   var custuserid1=123450;
                  //console.log(`sessionAttributes:${request.body.input.sessionAttributes.userFirstName}`);

                //  console.log(`sessionAttributes:${request.sessionAttributes.custuserid}`);
                  console.log(custuserid1);

      CustomerAccDetails.find({
          cifid:custuserid1
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
              //console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
              //var userFirstName = request.body.input.sessionAttributes.userFirstName;
              var userFirstName = "Aditya";

              console.log(`userFirstName:${userFirstName}`);

              if (docs.length === 0) {
                ////////////////
                console.log("Inside if block");
                var val = `Hi ${userFirstName},${msg1}, I see that you are not registered as a Diana customer. to validate Facebook Banking registeration details please type Register or Reg.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

                /////////////////

              } else {
                var cifofuser = `${docs[0].cifid}`;
                console.log(docs);
                // request.sessionAttributes.cifidd = `${cifofuser}`;
                 var nameofuser = `${docs[0].customer_Name}`;
                 request.body.input.session.attributes.cifidd =`${cifofuser}` ;
                // request.sessionAttributes.coreusername = `${nameofuser}`;
                request.body.input.session.attributes.nameofuser  =`${nameofuser}`;
				globalval.cifid = `${cifofuser}`;
				globalval.nameofuser = `${nameofuser}`;

                // console.log(request.sessionAttributes.coreusername);

                ///////////
                console.log("Inside else block");
               var val = `Hi ${request.body.input.session.attributes.nameofuser} ,${msg1} I am here to help you on your Accounts services and other Banking information from ABC Bank, Which services do you want me to assisst with? Please choose the option of Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions. End to exit the conversation`
//				var val = {
//    "outputSpeech": {"type":"PlainText","text":"Text to speak back to the user."},
//    "card": {
//      "type": "Simple",
//      "title": "Example of the Card Title",
//      "content": "Example of card content. This card has just plain text content.\nThe content is formatted with line breaks to improve readability."
//    }
//  };
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
				//resp=val;
				//console.log(resp);
				//console.log(resp(val));
				//resp.json(val);
                resp.json(responeData);
////////////////
                                      }},
                                      (e) => {
                                        ///////////
                                        console.log("Inside error block");
                                        var val = `Something went wrong `
                                        var responeData = {"callbackMessage": val};
                                        auditModel.responseData =responeData;
                                        console.log("auditModel>>",auditModel);
                                        saveAudit(request,auditModel);
                                        resp.json(responeData);

                                      });
                               //});
      //
      //     }).on('error', (e) => {
      //     console.error(e);
      // });


}

////////
///////////
function handleLambdaNewIntent(request, resp,auditModel) {
      console.log('Start handleLambdaNewIntent');
      console.log("request.body>>>>>>>>>",request.body);
      var auditid = request.body.input.requestAttributes.auditid;
console.log(`request ${auditid}`);
var val = `HI This is response from handleLambdaNewIntent server`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);

}


function handlestatementIntent(request, resp,auditModel) {
      console.log('Start handlestatementIntent');
		console.log("request.body>>>>>>>>>",request.body);
    //  var auditid = request.body.input.requestAttributes.auditid;
//console.log(`request ${auditid}`);
transactions.find(
{drcif :123450},
 function(err,data){
	 console.log('in for statement');
	if(err){
		console.log('in for err statement');
		var val = `HI This is err response from statement intent server`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);

	}else{
		console.log('in for succ statement');
		console.log(data);
//		var val = `16th March, Payment received from Lavender 8500 INR,
//				   18th March, ICICI bill payment of  2888 INR,
//				   20th March, Mc.Donalds spent is  641 INR,
//				   24th March, Amazon Internet services spent is  200 INR,
//				   25th March, Electricity bill spent is 1265 INR
//`
var len = data.length;
 //var lastamount = data[len].amount from ${data[len].draccount} account to ${data[len].craccount}

var val = `${todatestr}, Transferred  ${data[len-1].amount} from ${data[len-1].draccount} account to ${data[len-1].craccount},
			16th March, Payment received from Lavender 8500 INR,
			18th March, ICICI bill payment of  2888 INR,
			20th March, Mc.Donalds spent is  641 INR,
			24th March, Amazon Internet services spent is  200 INR,
			25th March, Electricity bill spent is 1265 INR`
			
			//${todatestr}, Transferred  ${data[len-2].amount} from ${data[len-2].draccount} account to ${data[len-2].craccount},
			//${todatestr}, Transferred  ${data[len-3].amount} from ${data[len-3].draccount} account to ${data[len-3].craccount},
			//${todatestr}, Transferred  ${data[len-4].amount} from ${data[len-4].draccount} account to ${data[len-4].craccount},
			//${todatestr}, Transferred  ${data[len-5].amount} from ${data[len-5].draccount} account to ${data[len-5].craccount}`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);

		
	}
})

 

}



function saveAudit(request,auditModel){
  console.log(" start saving data");
  var auditid = request.body.input.session.attributes.auditid;
  auditModel.requestData=request.body;
  auditModel.ciserviceName="Alexa";
 // auditModel.userName = request.body.input.userId;
  auditModel.lastUpdatedDate = new Date();

  audit.update({_id : auditid}, {$set:auditModel},  {upsert: true}, function(err,task){
    if (err){
      console.log('Could not update channel req count'+ err);
    }
})
}


//////////

  //////////handleCust_ACC_Intent
  function handleCustACCIntent(request, callback) {
      console.log('Start CustACCIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var msg = `Your Registration has been added successfully`;
      console.log('connect to Mongo Db server');
      var Customeraccdetails = new CustomerAccDetails({
          cifid: `${request.currentIntent.slots.cifid}`,
          salutation: `${request.currentIntent.slots.salutation}`,
          civil_ID: `${request.currentIntent.slots.civil_ID}`,
          customer_Name: `${request.currentIntent.slots.customer_Name}`,
          accounts: `${request.currentIntent.slots.accounts}`,
          accountname: `${request.currentIntent.slots.accountname}`,
          accountcurrency: `${request.currentIntent.slots.accountcurrency}`,
          accounttype: `${request.currentIntent.slots.accounttype}`,
          productcode: `${request.currentIntent.slots.productcode}`,
          AccoutBal: `${request.currentIntent.slots.AccoutBal}`,
          userid: `${request.currentIntent.slots.userid}`

      });
      Customeraccdetails.save().then((doc) => {
          console.log('Data got saved into the database');
          console.log(JSON.stringify(Customeraccdetails, undefined, 2));
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          console.log(`Response :${JSON.stringify(response)}`);
          console.log(`callback start`);
          callback(null, close(sessionAttributes, 'Fulfilled', response));
          console.log(`callback end`);

      }, (e) => {
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          callback(null, close(sessionAttributes, 'Fulfilled', response));
      });

  }


  ///////////
  //////////handleCust_Auth_Intent
  function handleCustAuthIntent(request, callback) {
      console.log('Start CustAuthIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);

      var msg = `Your Cust_Auth has been added successfully`;
      console.log('connect to Mongo Db server');
      var Customerauthdetails = new CustomerAuthDetails({
          cifid: `${request.currentIntent.slots.cifid}`,
          facebookid: `${request.currentIntent.slots.facebookid}`,
          twitterid: `${request.currentIntent.slots.twitterid}`,
          amazonid: `${request.currentIntent.slots.amazonid}`,
          googleid: `${request.currentIntent.slots.googleid}`,
          ques1: `${request.currentIntent.slots.ques1}`,
          ques2: `${request.currentIntent.slots.ques2}`,
          ques3: `${request.currentIntent.slots.ques3}`,
          ans1: `${request.currentIntent.slots.ans1}`,
          ans2: `${request.currentIntent.slots.ans2}`,
          ans3: `${request.currentIntent.slots.ans3}`,
          OTPbyemail: `${request.currentIntent.slots.OTPbyemail}`,
          EmailIdForAuth: `${request.currentIntent.slots.EmailIdForAuth}`,
          OTPbySMS: `${request.currentIntent.slots.OTPbySMS}`,
          RegisterMobile: `${request.currentIntent.slots.RegisterMobile}`,
          otp: `${request.currentIntent.slots.otp}`
      });

      Customerauthdetails.save().then((doc) => {
          console.log('Data got saved into the database');
          console.log(JSON.stringify(Customerauthdetails, undefined, 2));
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          console.log(`Response :${JSON.stringify(response)}`);

          console.log(`callback start`);
          callback(null, close(sessionAttributes, 'Fulfilled', response));
          console.log(`callback end`);
      }, (e) => {
          var response = {
              'contentType': 'PlainText',
              'content': `Hi ${request.userId},${msg} !!`
          };
          callback(null, close(sessionAttributes, 'Fulfilled', response));
      });
  }
  // // ////////////

  //check cust registration details
  function handlegetCustAccIntent(request, resp,auditModel)  {
      console.log('Start handlegetCustAccIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var msg1 = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
      var msg = `Your Registration has been added successfully`;
      console.log('connect to Mongo Db server');
    //var faceid = `${request.currentIntent.slots.facebookid}`;
  var faceid = `${request.body.input.currentIntent.slots.facebookid}`;
  //var faceid = `abcd@gmail.com`;
      //request.sessionAttributes.fid = faceid;
      //request.sessionAttributes.fbid1 = `${request.currentIntent.slots.facebookid}`;
      request.body.input.sessionAttributes.fbid1 = `${request.body.input.currentIntent.slots.facebookid}`;
      console.log('facebook id is ' + faceid);
//      console.log('Token:', PAGE_ACCESS_TOKEN);
      // https.get('https://graph.facebook.com/v2.6/' + request.userId + '?fields=first_name,last_name&access_token=' + PAGE_ACCESS_TOKEN,
      //
      //
      //     (res) => {
      //         console.log('res:', res);
      //         console.log('headers:', res.headers);
      //         res.on('data', (d) => {
      //             console.log(d);
      //             request.sessionAttributes.userFirstName = JSON.parse(d).first_name;
      //             console.log(`sessionAttributes:${request.sessionAttributes.userFirstName}`);
      //             // use below code to resend the reply
      //             //callSendAPI(messageData);
      //         });
      //
      //     }).on('error', (e) => {
      //     console.error(e);
      // });

      CustomerAuthDetails.find({
          facebookid: faceid
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
              console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
//              var userFirstName = request.sessionAttributes.userFirstName;
              var userFirstName =request.body.input.sessionAttributes.userFirstName;
              console.log(`userFirstName:${userFirstName}`);
              if (docs.length === 0) {
                console.log("Inside if block");
                var val =  `Hi ${userFirstName},${msg1}, I see that you are not registered as a Facebook Chat customer with ABC Bank.For account specific details you need to register for Facebook Banking service – By either visiting you internet Banking page https://s3.amazonaws.com/dianaci/index.html or visiting the nearest Branch.Thank You.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);
              } else {
                var cifofuser = `${docs[0].cifid}`;

                console.log(cifofuser);
                CustomerAccDetails.find({
                    cifid: cifofuser
                }).then((doc) => {
                    console.log('in for balance');
                    var nameofuser = `${doc[0].customer_Name}`;
//                    request.sessionAttribute.coreusername = `${nameofuser}`;
                      request.body.input.sessionAttributes.coreusername = `${nameofuser}`;
                    console.log(request.body.input.sessionAttributes.coreusername);
    },
    (e) => {
      console.log("Inside e block");
      var val =  `Something went wrong `
      var responeData = {"callbackMessage": val};
      auditModel.responseData =responeData;
      console.log("auditModel>>",auditModel);
      saveAudit(request,auditModel);
      resp.json(responeData);
    });
                  console.log(docs);
                  console.log(docs[0].cifid);
                          //console.log(data);
                          var custuserid1=request.body.input.sessionAttributes.custuserid;
                          console.log(custuserid1);
                        // successful response
                        CustomerAccDetails.update({cifid: cifofuser},{userid:custuserid1},{multi:true},(err)=> {
                            if(err) {
                              console.log(err);
                            } else {
                                console.log("updated successfully");
                                console.log("Inside else block");
                                var val =  `Hi ${request.body.input.sessionAttributes.coreusername},${msg1} You are already registered for facebook banking . We have updated your details with diana, I am here to help you on your Accounts services and other Banking information from ABC Bank.Please type in the following for me to understand the nature of your query. Type Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions.`
                                var responeData = {"callbackMessage": val};
                                auditModel.responseData =responeData;
                                console.log("auditModel>>",auditModel);
                                saveAudit(request,auditModel);
                                resp.json(responeData);
                              }
                        })
                    }
          },
          (e) => {

            console.log("Inside if block");
            var val =  `Something went wrong `
            var responeData = {"callbackMessage": val};
            auditModel.responseData =responeData;
            console.log("auditModel>>",auditModel);
            saveAudit(request,auditModel);
            resp.json(responeData);
          });
  }

  //////////

  function handleGetCustAuthIntent(request, resp,auditModel) {
      console.log('Start handleGetCustAuthIntent');
	  
//	  if (globalval.mode === 'T') {
//		   console.log('Entered transferRequest Execution Block');
//                handleconfirmtransferRequest(request, resp,auditModel);
//	  }else {
	  
      var cnt = 0;
      //var otpGen = request.body.input.sessionAttributes.otp;
	var otpGen = 111111;
      //var faceid = `${request.sessionAttributes.fbid1}`;
      //var faceid = `abcd@gmail.com`;
      //console.log('facebook id is ' + faceid);
      //console.log('facebook id is ' + request.sessionAttributes.fbid1);
      console.log('connect to Mongo Db server for getotp');
     // console.log("slot otp ", request.body.input.currentIntent.slots.otp);
     // var otp11 = `${request.body.input.currentIntent.slots.otp}`;

	//	console.log(request.body.input.intent.slots);

	   //var otp11 = request.body.input.currentIntent?request.body.input.currentIntent.slots.otp:request.body.input.intent.slots.otp.value;

		var otp11 = 111111;

      console.log(`Slot OTP: ${otp11}`);
      console.log(`Gen OTP:${otpGen}`);
  ////////////

  //var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;

    var cifofuser= globalval.cifid ;
    console.log(cifofuser);
console.log(typeof(parseInt(otp11)));
console.log(typeof(otpGen));
      if (otpGen === parseInt(otp11)) {

          CustomerAuthDetails.find({
              cifid: cifofuser}).then((docs) => {
              console.log('Data got fetched from the database ' + docs.length);
              console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
              if (docs.length !== 0) {
                  cnt = cnt + 1;
                  var cifofuser = `${docs[0].cifid}`;
                  console.log(cifofuser);
                  CustomerAccDetails.find({
                      cifid: cifofuser
                  }).then((doc) => {
                      console.log('in for balance');
                      var nameofuser = `${doc[0].customer_Name}`;
                      var balofuser = `${doc[0].AccoutBal}`;
                      var salofuser = `${doc[0].salutation}`;
                      var accounttype = `${doc[0].accounttype}`;
                      var accountcurrency = `${doc[0].accountcurrency}`
                      var accountNumber = `${doc[0].accounts}`;
                      accountNumber = accountNumber.replace(accountNumber.substring(4, 7), "*****");
                      console.log(balofuser);
                      console.log(`${doc[0].AccountBal}`);
                      if (doc.length === 1) {
                          console.log('got rec' + doc);
                          console.log(balofuser);
                          console.log(`${doc[0].AccountBal}`);
                          //console.log(AccountBal}`;);
/////////

                              console.log("Inside if block");
                              var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.`
                              var responeData = {"callbackMessage": val};
                              auditModel.responseData =responeData;
                              console.log("auditModel>>",auditModel);
                              saveAudit(request,auditModel);
                              resp.json(responeData);
                      } else if (doc.length === 2) {
                          console.log('got rec' + doc);
                          console.log(balofuser);

//////////

                                  console.log("Inside if block");
                                  var val = `Currently you have multiple accounts in ABC Bank, is your enquiry on a specific Account ? or do I read you Balances of all accounts`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);

                      } else {


                        console.log("Inside if block");
                        var val = `Accout balance details are not present`
                        var responeData = {"callbackMessage": val};
                        auditModel.responseData =responeData;
                        console.log("auditModel>>",auditModel);
                        saveAudit(request,auditModel);
                        resp.json(responeData);

                      }
                  }, (e) => {


                    console.log("Inside if block");
                    var val = `Something went wrong in fetching account bal`
                    var responeData = {"callbackMessage": val};
                    auditModel.responseData =responeData;
                    console.log("auditModel>>",auditModel);
                    saveAudit(request,auditModel);
                    resp.json(responeData);
                  })


              } else {
                console.log("Inside if block");
                var val =  `We regret to inform you that Facebook banking details is not available. Thank You.`
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

              }
          }, (e) => {

            console.log("Inside if block");
            var val = `Something went wrong `
            var responeData = {"callbackMessage": val};
            auditModel.responseData =responeData;
            console.log("auditModel>>",auditModel);
            saveAudit(request,auditModel);
            resp.json(responeData);

          })
      } else {


        console.log("Inside if block");
        var val = `We regret to inform you that the OTP is not correct Thank You. Is there anything else I can help you with? Type Balance for knowing your balance, type Transfers for initiating a transfer or statement for knowing last 5 transactions. `
        var responeData = {"callbackMessage": val};
        auditModel.responseData =responeData;
        console.log("auditModel>>",auditModel);
        saveAudit(request,auditModel);
        resp.json(responeData);

      }
  }

//}
  /////////////

  function handleGetBalIntent(request, resp,auditModel) {
      console.log('Start handleGetBalIntent');
     // console.log(request);
     // var sessionAttributes = request.sessionAttributes;
     // console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      //const slots = request.body.input.currentIntent.slots;
      var cnt = 0;
      console.log('connect to Mongo Db server');
      //var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;
	  var cifofuser= 123450 ;
      //console.log(`inputTranscript:${request.body.input.inputTranscript}`);

      CustomerAuthDetails.find({
          cifid: cifofuser
      }).then((docs) => {
          console.log('Data got fetched from the database ' + docs.length);
          
          if (docs.length !== 0) {

              cnt = cnt + 1;
              var cifofuser = `${docs[0].cifid}`;

              console.log(cifofuser);
              CustomerAccDetails.find({
                  cifid: cifofuser
              }).then((doc) => {
                  console.log('in for balance');
           //       var inputTranscript =request.body.input.inputTranscript;
                 // console.log(inputTranscript);
             //     console.log(`inputTranscript:${request.body.input.inputTranscript}`);

                  var nameofuser = `${doc[0].customer_Name}`;
                  var salofuser = `${doc[0].salutation}`;
                  var accounttype = `${doc[0].accounttype}`;
                  var accounttype2 = `${doc[1].accounttype}`;
                  var accountcurrency = `${doc[0].accountcurrency}`
                  var accountcurrency2 =`${doc[1].accountcurrency}`
                  var balofuser = `${doc[0].AccoutBal}`;
                  var balofuser2 = `${doc[1].AccoutBal}`;
                  var accountNumber = `${doc[0].accounts}`;
				  console.log('length of account number');
				  console.log(accountNumber.substring(accountNumber.length - 4 , accountNumber.length));
                  accountNumber = accountNumber.replace(accountNumber.substring(3, 4), "*****");
                  var accountNumber2 = `${doc[1].accounts}`;
                  accountNumber2 = accountNumber2.replace(accountNumber2.substring(3, 4), "*****");
          //        console.log(balofuser);
          //        console.log(`${doc[0].AccountBal}`);
          //        console.log(inputTranscript);
          //        console.log(accounttype);
          //        console.log(inputTranscript);
              //    if (`${accounttype}` === inputTranscript) {
              //        console.log('got rec' + doc);
              //        console.log(balofuser);
              //        console.log(`${doc[0].AccountBal}`);
              //    /////
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //
              //    } else if (`${accounttype}` === inputTranscript) {
              //        console.log('got rec' + doc);
              //        console.log(balofuser);
              //        console.log(`${doc[0].AccountBal}`);
              //
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else if (`${accounttype2}` == inputTranscript) {
              //        console.log('got rec' + doc);
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else if (`${accounttype2}` == inputTranscript) {
              //        console.log('got rec' + doc);
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else {
                                  console.log("Inside if block");
                                  var val =  `${salofuser} ${nameofuser},Your Balance in the ${accounttype} account ending with ${accountNumber.substring(accountNumber.length - 4 , accountNumber.length)} is ${balofuser} ${accountcurrency}.Your Balance in the ${accounttype2} account  ending with ${accountNumber2.substring(accountNumber2.length - 4 , accountNumber2.length)} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with, Please choose the option of Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions. End to exit the conversation`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);

                //  }
              }, (e) => {
                                    console.log("Inside if block");
                                    var val =  `Something went wrong in fetching account bal`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

                                    })
                } else {

                                    console.log("Inside if block");
                                    var val = `Something went wrong Thank You.`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);
          }
      }, (e) => {

                                    console.log("Inside if block");
                                    var val = `Something went wrong `
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

      })
  }
function handletransferRequest(request, resp,auditModel) {
      console.log('Start handletransferRequest');
	 globalval.cifid = 123450; 
	  
	  var sessionattr = request.body.input.session.attributes;
	  console.log(sessionattr);
		
	  var draccount = sessionattr.draccount;
	  var craccount = sessionattr.craccount;
	  var amount = sessionattr.amount;
	  
	  globalval.draccount = sessionattr.draccount;
	  globalval.craccount = sessionattr.craccount;
	  globalval.amount = sessionattr.amount;
	  
	  beneficiaryDetails.find(
    { BeneficiaryName: globalval.craccount }
  ,function(err,data){
	  if (err){
		   var val = 'Benfeciary Details cannot be fetched. Please let me know how can i help you. ';
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);
	  }else{
		  if(data.length === 0){
			   var val = `Beneficiary details not present for ${globalval.craccount}. Please add beneficiary details from the Internet Banking page. please say transfer if you want to reinitiate the transfer`;
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);
			}else{
				console.log(data);
				globalval.benefname = benef;
				globalval.BeneficiaryAccount = data[0].BeneficiaryAccount;
				globalval.BenificiaryCif = data[0].BenificiaryCif;
				
				var benef = data[0].BeneficiaryName;
				console.log(globalval.cifid);
				console.log(draccount);
				      CustomerAccDetails.find({
          cifid:globalval.cifid,
		  accounttype:draccount
		  
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
             var userFirstName = "Aditya";

              console.log(`userFirstName:${userFirstName}`);

              if (docs.length === 0) {
                console.log("Inside if block");
                var val = 'Please enter a valid Debit account number';
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

          
              } else {

				if 	(amount > docs[0].AccoutBal) {
					    var val = 'There in no sufficient balance to do the transaction';
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
		       resp.json(responeData);
				} else {
					//globalval.mode = 'T';
					
				globalval.balanceamount = 	docs[0].AccoutBal - amount;
				console.log(globalval.balanceamount);
				//ending with ${draccount.substring(draccount.length - 4 , draccount.length)} 
				var val = `Transfer of ${amount} INR from ${docs[0].accounttype}  account to the beneficiary name ${benef} is initiated. One Time Pin has been sent to your registered mobile number. Please say the Pin number as Pin Received followed by the number`;
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
		       resp.json(responeData);
				}
				
        
                                      }},
                                      (e) => {
                                         console.log("Inside error block");
                                        var val = `Something went wrong `
                                        var responeData = {"callbackMessage": val};
                                        auditModel.responseData =responeData;
                                        console.log("auditModel>>",auditModel);
                                        saveAudit(request,auditModel);
                                        resp.json(responeData);

                                      });
                             
				
		  
			}
	  }
	  });


}


function handleconfirmtransferRequest(request, resp,auditModel) {
      console.log('Start handleconfirmtransferRequest');
		console.log(globalval.cifid);
	console.log(globalval.draccount);
	  
	  var amount1= -1 * globalval.amount;
	  console.log(amount1);
	    CustomerAccDetails.update({
          cifid:globalval.cifid,
		  accounttype:globalval.draccount
		  
      }, {$inc: { AccoutBal:  amount1 }},   function(err,task){
    if (err){
      console.log("Inside if block");
                var val = 'Unable to fetch the record to debit the balance';
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

          
              } else {
				  
				  	    CustomerAccDetails.update({
          //cifid:globalval.cifid,
		  accounts:globalval.BeneficiaryAccount
		  
      }, {$inc: { AccoutBal:  globalval.amount }},   function(err,task){
    if (err){
      console.log("Inside if block");
                var val = 'Unable to fetch the record to credit the balance';
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

          
              } else {
				  
				  
				 var trandata = {drcif : globalval.cifid, draccount : globalval.draccount, craccount : globalval.craccount, amount :  globalval.amount } ;
				var traninfo = new transactions(trandata);
				traninfo.save(function(err, task) {
              if (err){
				   var val = 'Unable to save transaction' + err;
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);
				  
			  }else{
				  
				
			  var val = `Thanks for confirming the OTP. Your transfer is done successfully!! The account balance is  ${globalval.balanceamount}. Please choose the option of Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions. End to exit the conversation`;
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
		       resp.json(responeData);
				
				 }
		})
        
                                      }
		})
		}
				});
	  
	  
  //    CustomerAccDetails.update({
  //        cifid:globalval.cifid,
	//	  accounts:globalval.draccount
	//	  
  //    },
	//  {$inc: { AccoutBal:  amount1 }}
	//  ).then((docs) => {
  //            console.log('Data got fetched from the database' + docs.length);
  //             if (e) {
  //              console.log("Inside if block");
  //              var val = 'Unable to fetch the record to update the balance';
  //              var responeData = {"callbackMessage": val};
  //              auditModel.responseData =responeData;
  //              console.log("auditModel>>",auditModel);
  //              saveAudit(request,auditModel);
  //              resp.json(responeData);
  //
  //        
  //            } else {
  //
	//			
	//			var val = `Transferred Successfully! Cuurent balance in the account is ${docs[0].AccoutBal}`;
  //              var responeData = {"callbackMessage": val};
  //              auditModel.responseData =responeData;
  //              console.log("auditModel>>",auditModel);
  //              saveAudit(request,auditModel);
	//	       resp.json(responeData);
	//			
	//			
  //      
  //                                    }});
  //                           

}
   function handleGetBalIntentS(request, resp,auditModel) {
      console.log('Start handleGetBalIntent');
     // console.log(request);
     // var sessionAttributes = request.sessionAttributes;
     // console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      //const slots = request.body.input.currentIntent.slots;
      var cnt = 0;
      console.log('connect to Mongo Db server');
      //var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;
	  var cifofuser= 123450 ;
      //console.log(`inputTranscript:${request.body.input.inputTranscript}`);

      CustomerAuthDetails.find({
          cifid: cifofuser
      }).then((docs) => {
          console.log('Data got fetched from the database ' + docs.length);
          console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));

          if (docs.length !== 0) {

              cnt = cnt + 1;
              var cifofuser = `${docs[0].cifid}`;

              console.log(cifofuser);
              CustomerAccDetails.find({
                  cifid: cifofuser
              }).then((doc) => {
                  console.log('in for balance');
				  console.log(doc);
           //       var inputTranscript =request.body.input.inputTranscript;
                 // console.log(inputTranscript);
             //     console.log(`inputTranscript:${request.body.input.inputTranscript}`);

                  var nameofuser = `${doc[0].customer_Name}`;
                  var salofuser = `${doc[0].salutation}`;
                  var accounttype = `${doc[0].accounttype}`;
                  var accounttype2 = `${doc[1].accounttype}`;
                  var accountcurrency = `${doc[0].accountcurrency}`
                  var accountcurrency2 =`${doc[1].accountcurrency}`
                  var balofuser = `${doc[0].AccoutBal}`;
                  var balofuser2 = `${doc[1].AccoutBal}`;
                  var accountNumber = `${doc[0].accounts}`;
                  accountNumber = accountNumber.replace(accountNumber.substring(3, 4), "*****");
                  var accountNumber2 = `${doc[1].accounts}`;
                  accountNumber2 = accountNumber2.replace(accountNumber2.substring(3, 4), "*****");
          //        console.log(balofuser);
          //        console.log(`${doc[0].AccountBal}`);
          //        console.log(inputTranscript);
          //        console.log(accounttype);
          //        console.log(inputTranscript);
                  if (`${accounttype}` === 'SAVING') {
                      console.log('got rec' + doc);
                      console.log(balofuser);
                      console.log(`${doc[0].AccountBal}`);
                                  console.log("Inside if block");
                                  var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ending with ${accountNumber.substring(accountNumber.length - 4 , accountNumber.length)} is ${balofuser} ${accountcurrency}.Is there anything else I can help you with, Please choose the option of Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions. End to exit the conversation`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);

                 } else if (`${accounttype2}` == 'SAVING') {
                      console.log('got rec' + doc);
                                  console.log("Inside if block");
                                  var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ending with ${accountNumber2.substring(accountNumber2.length - 4 , accountNumber2.length)} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with, Please choose the option of Balance for knowing your balance, transfers for initiating a transfer or statement for knowing last 5 transactions. End to exit the conversation`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);
                  }
			  //else if (`${accounttype2}` == inputTranscript) {
              //        console.log('got rec' + doc);
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else {
       //                           console.log("Inside if block");
       //                           var val =  `${salofuser} ${nameofuser},Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
       //                           var responeData = {"callbackMessage": val};
       //                           auditModel.responseData =responeData;
       //                           console.log("auditModel>>",auditModel);
       //                           saveAudit(request,auditModel);
       //                           resp.json(responeData);

                //  }
              }, (e) => {
                                    console.log("Inside if block");
                                    var val =  `Something went wrong in fetching account bal`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

                                    })
                } else {

                                    console.log("Inside if block");
                                    var val = `Something went wrong Thank You.`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);
          }
      }, (e) => {

                                    console.log("Inside if block");
                                    var val = `Something went wrong `
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

      })
  }

   function handleGetBalIntentC(request, resp,auditModel) {
      console.log('Start handleGetBalIntent');
     // console.log(request);
     // var sessionAttributes = request.sessionAttributes;
     // console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      //const slots = request.body.input.currentIntent.slots;
      var cnt = 0;
      console.log('connect to Mongo Db server');
      //var cifofuser= `${request.body.input.sessionAttributes.cifidd}` ;
	  var cifofuser= 123450 ;
      //console.log(`inputTranscript:${request.body.input.inputTranscript}`);

      CustomerAuthDetails.find({
          cifid: cifofuser
      }).then((docs) => {
          console.log('Data got fetched from the database ' + docs.length);
          console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));

          if (docs.length !== 0) {

              cnt = cnt + 1;
              var cifofuser = `${docs[0].cifid}`;

              console.log(cifofuser);
              CustomerAccDetails.find({
                  cifid: cifofuser
              }).then((doc) => {
                  console.log('in for balance');
           //       var inputTranscript =request.body.input.inputTranscript;
                 // console.log(inputTranscript);
             //     console.log(`inputTranscript:${request.body.input.inputTranscript}`);

                  var nameofuser = `${doc[0].customer_Name}`;
                  var salofuser = `${doc[0].salutation}`;
                  var accounttype = `${doc[0].accounttype}`;
                  var accounttype2 = `${doc[1].accounttype}`;
                  var accountcurrency = `${doc[0].accountcurrency}`
                  var accountcurrency2 =`${doc[1].accountcurrency}`
                  var balofuser = `${doc[0].AccoutBal}`;
                  var balofuser2 = `${doc[1].AccoutBal}`;
                  var accountNumber = `${doc[0].accounts}`;
                  accountNumber = accountNumber.replace(accountNumber.substring(3, 4), "*****");
                  var accountNumber2 = `${doc[1].accounts}`;
                  accountNumber2 = accountNumber2.replace(accountNumber2.substring(3, 4), "*****");
          //        console.log(balofuser);
          //        console.log(`${doc[0].AccountBal}`);
          //        console.log(inputTranscript);
          //        console.log(accounttype);
          //        console.log(inputTranscript);
                  if (`${accounttype}` === 'CURRENT') {
                      console.log('got rec' + doc);
                      console.log(balofuser);
                      console.log(`${doc[0].AccountBal}`);
                  /////
                                  console.log("Inside if block");
                                  var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype} account ending with ${accountNumber.substring(accountNumber.length - 4 , accountNumber.length)} is ${balofuser} ${accountcurrency}.Is there anything else I can help you with`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);

                  }  else if (`${accounttype2}` == 'CURRENT') {
                      console.log('got rec' + doc);
                                  console.log("Inside if block");
                                  var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ending with ${accountNumber2.substring(accountNumber2.length - 4 , accountNumber2.length)} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
                                  var responeData = {"callbackMessage": val};
                                  auditModel.responseData =responeData;
                                  console.log("auditModel>>",auditModel);
                                  saveAudit(request,auditModel);
                                  resp.json(responeData);
                  }
			  //	  else if (`${accounttype2}` == inputTranscript) {
              //        console.log('got rec' + doc);
              //                    console.log("Inside if block");
              //                    var val = `${salofuser} ${nameofuser}, Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
              //                    var responeData = {"callbackMessage": val};
              //                    auditModel.responseData =responeData;
              //                    console.log("auditModel>>",auditModel);
              //                    saveAudit(request,auditModel);
              //                    resp.json(responeData);
              //    } else {
               //                   console.log("Inside if block");
               //                   var val =  `${salofuser} ${nameofuser},Your Balance in the ${accounttype} account ${accountNumber} is ${balofuser} ${accountcurrency}.Your Balance in the ${accounttype2} account ${accountNumber2} is ${balofuser2} ${accountcurrency2}.Is there anything else I can help you with`
               //                   var responeData = {"callbackMessage": val};
               //                   auditModel.responseData =responeData;
               //                   console.log("auditModel>>",auditModel);
               //                   saveAudit(request,auditModel);
               //                   resp.json(responeData);

                //  }
              }, (e) => {
                                    console.log("Inside if block");
                                    var val =  `Something went wrong in fetching account bal`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

                                    })
                } else {

                                    console.log("Inside if block");
                                    var val = `Something went wrong Thank You.`
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);
          }
      }, (e) => {

                                    console.log("Inside if block");
                                    var val = `Something went wrong `
                                    var responeData = {"callbackMessage": val};
                                    auditModel.responseData =responeData;
                                    console.log("auditModel>>",auditModel);
                                    saveAudit(request,auditModel);
                                    resp.json(responeData);

      })
  }


  ///////////

  function handledisconnectIntent(request, callback) {

      console.log('Start handledisconnectIntent');
      var sessionAttributes = request.sessionAttributes;
      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
      var cifofuser= `${request.sessionAttributes.cifidd}` ;

      //var faceid = `${request.sessionAttributes.fbid1}`;
      console.log('cifofuser id is ' + cifofuser);

      CustomerAuthDetails.find({
            cifid: cifofuser
      }).then((docs) => {
          console.log('Data got fetched from the database ' + docs.length);
          console.log(JSON.stringify(CustomerAuthDetails, undefined, 2));
          if (docs.length !== 0) {
              var cifofuser = `${docs[0].cifid}`;
              console.log(cifofuser);
              CustomerAccDetails.find({
                  cifid: cifofuser
              }).then((doc) => {
                  console.log('in for details');
                  if (doc.length !== 0) {
                      console.log('got rec' + doc);
                      var nameofuser = `${doc[0].customer_Name}`;
                      var salofuser = `${doc[0].salutation}`;
                      var response = {
                          'contentType': 'PlainText',
                          'content': `Thank You ! ${salofuser} ${nameofuser}, Let’s talk soon when you need any help with account service inquiries of ABC Bank.`
                      };
                      console.log(`Response :${JSON.stringify(response)}`);
                      callback(null, close(sessionAttributes, 'Fulfilled', response));
                      return (response.content);
                  } else {
                      var response = {
                          'contentType': 'PlainText',
                          'content': `Thank You !`
                      };
                      console.log(`Response :${JSON.stringify(response)}`);
                      callback(null, close(sessionAttributes, 'Fulfilled', response));
                  }
              }, (e) => {
                  var response = {
                      'contentType': 'PlainText',
                      'content': `Something went wrong in fetching account bal`
                  };
                  console.log('Unable to fetch Data from database', e);
                  console.log(`Response :${JSON.stringify(response)}`);
                  callback(null, close(sessionAttributes, 'Fulfilled', response));
              })
          } else {
              var response = {
                  'contentType': 'PlainText',
                  'content': `Thank You.`
              };
              console.log(`Response :${JSON.stringify(response)}`);
              callback(null, close(sessionAttributes, 'Fulfilled', response));
          }
      }, (e) => {
          var response = {
              'contentType': 'PlainText',
              'content': `Something went wrong `
          };
          console.log('Unable to fetch Data from database', e);
          console.log(`Response :${JSON.stringify(response)}`);
          callback(null, close(sessionAttributes, 'Fulfilled', response));
      })
  }

  //Default or Error Handling for invalid intent
  function handleDefault(request, callback) {
      var sessionAttributes = request.sessionAttributes;
      var response = {
          'contentType': 'PlainText',
          'content': `Invalid Request. Please try again !`
      }
      callback(null, close(sessionAttributes, 'Fulfilled', response));
  }

  function handlegenotpIntent(request,  resp,auditModel) {
      console.log('Start handlegenotpIntent');
      var sessionAttributes = request.body.input.session.attributes;
//      var requestAttributes = request.body.input.requestAttributes;

      console.log(`Session Attr:${JSON.stringify(sessionAttributes)}`);
	  console.log(globalval.cifid);
      var msg1 = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
      var msg = `Your Registration has been added successfully`;
      console.log('connect to Mongo Db server');
     //  request.body.input.sessionAttributes= {cifidd :123452};
     //  request.body.input.sessionAttributes.userFirstName="Anitha";
     // console.log(typeof(request.body.input.sessionAttributes));
     // console.log(typeof(request.body.input.requestAttributes));
    //  var cifofuser= 123452 ;
  var cifofuser= globalval.cifid ;

  console.log("cifofuser>>>>",cifofuser);

    //  console.log('Token:', PAGE_ACCESS_TOKEN);
      // https.get('https://graph.facebook.com/v2.6/' + request.userId + '?fields=first_name,last_name&access_token=' + PAGE_ACCESS_TOKEN,
      //
      //
      //     (res) => {
      //         console.log('res:', res);
      //         console.log('headers:', res.headers);
      //         res.on('data', (d) => {
      //             console.log(d);
      //             request.sessionAttributes.userFirstName = JSON.parse(d).first_name;
      //             console.log(`sessionAttributes:${request.sessionAttributes.userFirstName}`);
      //             // use below code to resend the reply
      //             //callSendAPI(messageData);
      //         });
      //
      //     }).on('error', (e) => {
      //     console.error(e);
      // });

      CustomerAuthDetails.find({
          cifid: cifofuser
      }).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
              var userFirstName = globalval.nameofuser;
              //var userFirstName = "Anitha";
              console.log(`userFirstName:${userFirstName}`);

              if (docs.length === 0) {
///////////
console.log("Inside if block");
var val = `Hi ${userFirstName},${msg1}, I see that you are not registered as a Facebook Chat customer with ABC Bank.For account specific details you need to register for Facebook Banking service – By either visiting you internet Banking page https://s3.amazonaws.com/dianaci/index.html or visiting the nearest Branch.Thank You.`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);
//////////
              } else {
                var cifofuser = `${docs[0].cifid}`;

                console.log(cifofuser);
                CustomerAccDetails.find({
                    cifid: cifofuser
                }).then((doc) => {
                    console.log('in for balance');
                    var nameofuser = `${doc[0].customer_Name}`;
                    //request.body.input.sessionAttributes.coreusername = `${nameofuser}`;
                    
                  console.log(docs);
                  console.log(docs[0].cifid);
                  console.log('in for otp');
                  var otpGen = random(999999, 111111);
                  console.log(otpGen);

                  request.body.input.session.attributes.otp = `${otpGen}`;
                  console.log(docs);

                  var mobileofuser = `${docs[0].RegisterMobile}`;
                  var otpofuser = `${docs[0].otp}`;
                  console.log(mobileofuser);
                  console.log(`${docs[0].RegisterMobile}`);
                  console.log(`otp is :${otpGen}`);
                  console.log(`${docs[0].otp}`);
                  //
                  // var sns = new AWS.SNS();
                  // var params = {
                  //     Message: `Dear ${userFirstName}, you are trying to access confidential information via DIANA and otp is : ${otpGen}`,
                  //     MessageStructure: 'string',
                  //     PhoneNumber: `${mobileofuser}`,
                  //     Subject: 'Reference'
                  // };

                  // sns.publish(params, function(err, data) {
                  //     if (err) {
                  //         console.log(err, err.stack);
                  //     } // an error occurred
                  //     else {
                  //         console.log(data);
                  //         var custuserid1=request.sessionAttributes.custuserid;
                  //         console.log(custuserid1);
                  //       // successful response
                  //       CustomerAccDetails.update({cifid: cifofuser},{userid:custuserid1},{multi:true},(err)=> {
                  //           if(err) {
                  //             console.log(err);
                  //           } else {
                  //               console.log("updated successfully");
///////////////
console.log("Inside e block");
var val = `One time pin has been shared to the Registered Mobile Number. Please confirm the One time pin as one time pin is followed by the number.`
var responeData = {"callbackMessage": val};
auditModel.responseData =responeData;
console.log("auditModel>>",auditModel);
saveAudit(request,auditModel);
resp.json(responeData);

                        },
                      (e) => {
                  //////////
                  console.log("Inside e block");
                  var val = `Something went wrong `
                  var responeData = {"callbackMessage": val};
                  auditModel.responseData =responeData;
                  console.log("auditModel>>",auditModel);
                  saveAudit(request,auditModel);
                  resp.json(responeData);
                      });

                    }
                  })
                }


  //Prepare Response
  function close(sessionAttributes, fulfillmentState, message) {
      console.log(sessionAttributes, fulfillmentState, message);
      return {
          sessionAttributes,
          dialogAction: {
              type: 'Close',
              fulfillmentState,
              message
          }
      };

  }

  //////////////