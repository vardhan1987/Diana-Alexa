
const PAGE_TOKEN = process.env.PAGE_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const date = new Date().getHours();
const httprequest = require('request');


var mongoose = require('mongoose'),
audit = mongoose.model('audit');


var globalamt ={};

var Alexa = require("alexa-sdk");
var request = require('request');
var random = require('random-number-generator')


let speechOutput;
let reprompt;
const welcomeOutput = "Welcome to the Chat Banking. I am Diana, your Chat Assistant";
const welcomeReprompt = "Let me know how can i help you";

exports.handleintents = function(req, resp) {
var event = req;
exports.handler = function(event, context, callback){
	console.log('Entered here');
    var alexa = Alexa.handler(event,context);
    alexa.appId = "amzn1.ask.skill.9ccb7034-dded-4926-a17e-13a7bac3c733";
    alexa.registerHandlers(Handler);
    alexa.execute();
};

};


var Handler = {
    'LaunchRequest' : function(){
         this.response.speak(welcomeOutput).listen(welcomeReprompt);
         this.emit(':responseReady');
      },
	      'screenIntent' : function(){
			  this.response.shouldEndSession(false);
			  speechOutput = 'Sorry, I do not understand that. Let me know if i can help you with Banking services like Balance Inquiry / Transfer';
         this.response.speak(speechOutput);
         this.emit(':responseReady');
      },
	  	      'disconnectIntent' : function(){
			  speechOutput = 'Thank you for using the Diana Skill.';
         this.response.speak(speechOutput);
         this.emit(':responseReady');
      },
    'GreetingIntent': function () {
          //var filledSlots = delegateSlotCollection.call(this);
         // console.log(filledSlots.slots.namee.value);

          //var userid = filledSlots.slots.namee.value;
          console.log('Logging this ' +this.event.request);
          var msg = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
		  console.log('Logging event b' );
		  console.log(this.event);
		  
          console.log('Logging event a' );
		  var asd = this;
		  var auditdata = {channelName : 'Alexa', requestDate : new Date()} ;
            var auditinfo = new audit(auditdata);
            auditinfo.save(function(err, task) {
              if (err){
                console.log('Audit information could not be saved' + err);
                res.json({message :'Audit information could not be saved. Not forwarding to CI Service'});
              }else{
              console.log(task);
			  console.log(task._id);
			  var audid = task._id.toString();
			  console.log(audid);
			  console.log(asd.event);
              
		  
		  asd.event.session.attributes = {auditid : audid , channelid : 'Alexa'};
 			var ans = asd;
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":ans.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											  
												
									console.log('tryin to send the error back');
									speechOutput = 'Error in http call';
									ans.response.speak(speechOutput);
									ans.emit(':responseReady');
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 ans.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  ans.response.speak(speechOutput);
                  ans.emit(':responseReady');
												
										  }
      });
			  }
			});

    },
    'getCustAccIntent': function () {
      console.log('in get acc intent');
          var filledSlots = delegateSlotCollection.call(this);
          console.log(filledSlots.slots.facebookid.value);

          var fid = filledSlots.slots.facebookid.value + "@gmail.com";
          globalamt.mailid = fid;
          console.log('fid is '+ fid);
          CustomerAuthDetails.find({facebookid : fid}).then((docs) => {
            console.log('Find the user');
            if (docs.length === 0 ){
              this.response.shouldEndSession(false);

                  speechOutput = "I am DIANA, your chat assistant from ABC Bank, how may I help you today. I am here to provide you information on your Accounts services and other Banking information from ABC Bank. I see that you are not registered as a Chat Banking customer, for account specific details you need to register for Chat Banking service – By either visiting your                  internet Banking (provide a link here and redirect to the Banking page) or visiting the nearest Branch. Thank You.";
                  this.response.speak(speechOutput);
                  this.emit(':responseReady');


                  }  else{
                    console.log(this.response);
                    this.response.shouldEndSession(false);
                    speechOutput =" You are already registered for Chat banking. I am DIANA,  your chat assistant from ABC Bank, how may I help you today. I am here to help you on your Accounts services and other Banking information from ABC Bank. If you want to know your balance then say :'my balance' else let me know your query";
                  this.response.speak(speechOutput);
                  console.log(this.response);
                  this.emit(':responseReady');
                          }
        },(e) =>{
                this.emit(':tell','Something went wrong. Please repeat how may i help you');
                });

      //    this.emit(':tell','Hi ,I am DIANA, your chat assistant from ABC Bank, how may I help you today. I am here to help you on your Accounts services and other Banking information from ABC Bank. Please enter "facebook banking" to start conversation with me.!!');

    },
	    'transferRequest': function () {
      console.log('in transfer intent');
          var filledSlots = delegateSlotCollection.call(this);
          
          var draccount = filledSlots.slots.draccount.value;
		  var amount = filledSlots.slots.amount.value;
          var craccount = filledSlots.slots.craccount.value;
		  console.log(draccount);
			console.log(amount);
			console.log(craccount);
			
			 var asd = this;
		  var auditdata = {channelName : 'Alexa', requestDate : new Date()} ;
            var auditinfo = new audit(auditdata);
            auditinfo.save(function(err, task) {
              if (err){
                console.log('Audit information could not be saved' + err);
                res.json({message :'Audit information could not be saved. Not forwarding to CI Service'});
              }else{
              console.log(task);
			  console.log(task._id);
			  var audid = task._id.toString();
			  console.log(audid);
			  console.log(asd.event);

          			var ans = asd;
					 
			ans.event.session.attributes = {draccount : draccount , amount : amount, craccount : craccount, auditid : audid , channelid : 'Alexa'};
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":ans.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 ans.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  ans.response.speak(speechOutput);
                  ans.emit(':responseReady');
												
										  }
      });
			
			  }
			  });
      //    this.emit(':tell','Hi ,I am DIANA, your chat assistant from ABC Bank, how may I help you today. I am here to help you on your Accounts services and other Banking information from ABC Bank. Please enter "facebook banking" to start conversation with me.!!');

    },
	 'confirmTransferRequest': function () {
           console.log('in confirm transfer intent');
       					 var asd = this;
		  var auditdata = {channelName : 'Alexa', requestDate : new Date()} ;
            var auditinfo = new audit(auditdata);
            auditinfo.save(function(err, task) {
              if (err){
                console.log('Audit information could not be saved' + err);
                res.json({message :'Audit information could not be saved. Not forwarding to CI Service'});
              }else{
              console.log(task);
			  console.log(task._id);
			  var audid = task._id.toString();
			  console.log(audid);
			  console.log(asd.event);

          			var ans = asd;
					 
			ans.event.session.attributes = {auditid : audid , channelid : 'Alexa'};
			
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":ans.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 ans.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  ans.response.speak(speechOutput);
                  ans.emit(':responseReady');
												
										  }
      });
			
			  }
			  });
      //    this.emit(':tell','Hi ,I am DIANA, your chat assistant from ABC Bank, how may I help you today. I am here to help you on your Accounts services and other Banking information from ABC Bank. Please enter "facebook banking" to start conversation with me.!!');

    },
	'savingintent': function () {
			if (globalamt.typeofacc === "saving"){
		  speechOutput = ` ${globalamt.salofuser} ${globalamt.nameofuser}, Your Balance in the ${globalamt.typeofacc} account ${globalamt.accnum} Is ${globalamt.accountcurrency} ${globalamt.balofuser}  `;
          this.response.shouldEndSession(false);
		  this.response.speak(speechOutput);
          this.emit(':responseReady');
			}else{
				speechOutput = ` ${globalamt.salofuser} ${globalamt.nameofuser}, Your Balance in the ${globalamt.typeofacc1} account ${globalamt.accnum1} Is ${globalamt.accountcurrency1} ${globalamt.balofuser1}  `;
          this.response.shouldEndSession(false);
		  this.response.speak(speechOutput);
          this.emit(':responseReady');
			
			}
	},
		'currentintent': function () {
			if (globalamt.typeofacc === "current"){
		  speechOutput = ` ${globalamt.salofuser} ${globalamt.nameofuser}, Your Balance in the ${globalamt.typeofacc} account ${globalamt.accnum} Is ${globalamt.accountcurrency} ${globalamt.balofuser}  `;
          this.response.shouldEndSession(false);
		  this.response.speak(speechOutput);
          this.emit(':responseReady');
			}else{
				speechOutput = ` ${globalamt.salofuser} ${globalamt.nameofuser}, Your Balance in the ${globalamt.typeofacc1} account ${globalamt.accnum1} Is ${globalamt.accountcurrency1} ${globalamt.balofuser1}  `;
          this.response.shouldEndSession(false);
		  this.response.speak(speechOutput);
          this.emit(':responseReady');
			
			}
	},
	'allaccountintent': function () {
		  speechOutput = ` ${globalamt.salofuser} ${globalamt.nameofuser}, Your Balance in the ${globalamt.typeofacc} account ${globalamt.accnum} Is ${globalamt.accountcurrency} ${globalamt.balofuser}  and
	Your Balance in the ${globalamt.typeofacc1} account ${globalamt.accnum1} Is ${globalamt.accountcurrency1} ${globalamt.balofuser1}`;
          this.response.speak(speechOutput);
          this.emit(':responseReady');
			
	},
//cust auth starts
'genotp' : function()  {
        console.log('Start genotp');
      //  console.log('Check username ' + this.sessionAttributes.username);
      //  var filledSlots = delegateSlotCollection.call(this);
    //    console.log('otp is '+filledSlots.slots.otp.value);
	//	globalamt.otp = 111111 ;
	//	globalamt.cif = 123450 ;
    //    console.log('cif is '+globalamt.cif);
    //
//var otpfromuser = filledSlots.slots.otp.value;
//var fid = globalamt.mailid;




			var asd = this;
					  var auditdata = {channelName : 'Alexa', requestDate : new Date()} ;
            var auditinfo = new audit(auditdata);
            auditinfo.save(function(err, task) {
              if (err){
                console.log('Audit information could not be saved' + err);
                res.json({message :'Audit information could not be saved. Not forwarding to CI Service'});
              }else{
              console.log(task);
			  console.log(task._id);
			  var audid = task._id.toString();
			  console.log(audid);
			  console.log(asd.event);
              
		  
		  asd.event.session.attributes.auditid = audid ;
		  asd.event.session.attributes.channelid = 'Alexa';
			var ans = asd;
			
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":ans.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 ans.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  ans.response.speak(speechOutput);
                  ans.emit(':responseReady');
												
										  }
      });
			  }
			});
			

},
'getotp' : function()  {
        console.log('Start getotp');
      //  console.log('Check username ' + this.sessionAttributes.username);
        //var filledSlots = delegateSlotCollection.call(this);
        //console.log('otp is '+filledSlots.slots.otp.value);
	//	globalamt.otp = 111111 ;
	//	globalamt.cif = 123450 ;
    //    console.log('cif is '+globalamt.cif);
    //
//var otpfromuser = filledSlots.slots.otp.value;
//var fid = globalamt.mailid;


			var asd = this;
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":asd.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 this.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  this.response.speak(speechOutput);
                  this.emit(':responseReady');
												
										  }
      });
												
			

},
'GetBalIntentnew' : function()  {
        console.log('Start handleGetCustAuthIntent');
      //  console.log('Check username ' + this.sessionAttributes.username);
       // var filledSlots = delegateSlotCollection.call(this);
    //    console.log('otp is '+filledSlots.slots.otp.value);
	//	globalamt.otp = 111111 ;
	//	globalamt.cif = 123450 ;
    //    console.log('cif is '+globalamt.cif);
    //
//var otpfromuser = filledSlots.slots.otp.value;
//var fid = globalamt.mailid;


			var asd = this;
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":asd.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 this.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  this.response.speak(speechOutput);
                  this.emit(':responseReady');
												
										  }
      });
												
			

},
'GetBalIntentnewS' : function()  {
        console.log('Start handleGetCustAuthIntent');
      //  console.log('Check username ' + this.sessionAttributes.username);
        //var filledSlots = delegateSlotCollection.call(this);
    //    console.log('otp is '+filledSlots.slots.otp.value);
	//	globalamt.otp = 111111 ;
	//	globalamt.cif = 123450 ;
    //    console.log('cif is '+globalamt.cif);
    //
//var otpfromuser = filledSlots.slots.otp.value;
//var fid = globalamt.mailid;


			var asd = this;
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":asd.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 this.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  this.response.speak(speechOutput);
                  this.emit(':responseReady');
												
										  }
      });
												
			

},
'GetBalIntentnewC' : function()  {
        console.log('Start handleGetCustAuthIntent');
      //  console.log('Check username ' + this.sessionAttributes.username);
      //  var filledSlots = delegateSlotCollection.call(this);
    //    console.log('otp is '+filledSlots.slots.otp.value);
	//	globalamt.otp = 111111 ;
	//	globalamt.cif = 123450 ;
    //    console.log('cif is '+globalamt.cif);
    //
//var otpfromuser = filledSlots.slots.otp.value;
//var fid = globalamt.mailid;


			var asd = this;
			  httprequest.post ({
											  url: 'https://sleepy-eyrie-90425.herokuapp.com/handlealexaintents', form:{"input":asd.event}
										  }, (error, response, body)=> {
											  console.log(`error:${error}`);
											  console.log(response); 
											  console.log(`response: ${response}`);
											  console.log(`body:${body}`);
											
										  if (error){
											 callback('Cant connect to as error occured',null);
										  }else if (response.statusCode === 400){
											 callback('Not able to fetch data',null);
										  }else if (response.statusCode===200){
											  console.log('Enter seccess block')
											 var msg = JSON.parse(body);
											 
												console.log(`${msg.callbackMessage}`);
											 
													 this.response.shouldEndSession(false);
	
                  speechOutput = `${msg.callbackMessage}`;
                  this.response.speak(speechOutput);
                  this.emit(':responseReady');
												
										  }
      });
												
			

}
};


//cust auth ends

 

  function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent.name));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}
