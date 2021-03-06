Invoices = new Meteor.Collection("invoices");

if (Meteor.isClient) {
  Template.hello.helpers({
    invoices: function(){
      return Invoices.find({});
    }
  });
  
  Template.hello.greeting = function () {
    return "Welcome to recurring-xero-samson.";
  };

  Template.hello.events({
    'click input' : function () {
      //insert into invoices collection
       Invoices.insert({
	'customer_id': '1',
	'start_date': new Date(),
	'end_date': 'date the subscription stops',
	'repeat_every': 'false = one time subscription, int = number of units',
	'repeat_unit':'false = does not recurre, day, week, month, year',
	'repeat_until':'false = continues until cancelled, date = the day this subscription will stop repeating',
	'status':"open = a subscription that is currently active, opening = a subscription that is in the process of being created, closing = a subscrption that is being closed, while a new one is being opened, closed = a subscription that has been completed, template = a subscription profile yet to be activated, trial = a subscription that is under a trial and is not billed, will convert to real subscription on end_data, trial_cancelled = a trial that was never continued, trial_converting = a trial that is in the process of being duplicated into a real subcription, trial_converted = a trial that was converted into a billed subscription, stopped = a subscription that was stopped",
	'is_pro_rated':'true = the amounts in the items list cover only a portion of the full subscription, false = the amounts are the full price',
	'billed_item':{
		'description': 'the text description of the item',
		'cost': 'always the full price',
		'pro_rated_cost': 'the price when the subscription is pro rated',
		'accounting_code': 'the code used for tracking revenues',
		'repeat':'true = is an item that repeats, false = is a one time charge',
		'tax':{
			'tax_id': 'mongo id that refers to the tax colletion'
		}
	}
});
//end insert
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
