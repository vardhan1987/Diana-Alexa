function handletransferRequest(request, resp,auditModel) {
      console.log('Start handletransferRequest');
	  var sessionattr = request.body.input.session.attributes;
	  console.log(sessionattr);
		
	  var draccount = sessionattr.draccount;
	  var craccount = sessionattr.craccount;
	  var amount = sessionattr.amount;
	  
	  
	  
      CustomerAccDetails.find({
          cifid:globalval.cifid,
		  accounts:draccount
		  
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
				var val = `Transfer of ${amount} from ${docs[0].accounttype} account ${draccount} to the beneficiary account ${craccount} is initiated. Please CONFIRM to proceed`;
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


function handleconfirmtransferRequest(request, resp,auditModel) {
      console.log('Start handletransferRequest');
	  var sessionattr = request.body.input.session.attributes;
	  console.log(sessionattr);
		
	  var draccount = sessionattr.draccount;
	  var craccount = sessionattr.craccount;
	  var amount = sessionattr.amount;
	  
	  var amount1= -1 * amount;
	  
      CustomerAccDetails.update({
          cifid:globalval.cifid,
		  accounts:draccount
		  
      },
	  {$inc: { AccoutBal:  amount1 }}
	  ).then((docs) => {
              console.log('Data got fetched from the database' + docs.length);
               if (docs.length === 0) {
                console.log("Inside if block");
                var val = 'Unable to fetch the record to update the balance';
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
                resp.json(responeData);

          
              } else {

				
				var val = `Transferred Successfully! Cuurent balance in the account is ${docs[0].AccoutBal}`;
                var responeData = {"callbackMessage": val};
                auditModel.responseData =responeData;
                console.log("auditModel>>",auditModel);
                saveAudit(request,auditModel);
		       resp.json(responeData);
				
				
        
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