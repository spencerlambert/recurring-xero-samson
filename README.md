# Project Goals

1. Tracks subscriptions associated with a customer
2. Handles upgrades and downgrades of a subscription
3. Automatically posts invoices to the Xero API
4. Emails invoices to customers
5. Automatically collects credit card payments and posts them to Xero
 
# Details

## Envisioned Functions

* new()
* getAllItems()
* addItem(item)
* updateItem(item)
* setRepeating(repeat_obj)
* setStart(date)
* more...

## Envisioned Modules

#### Subscription UI

This is the UI that talks to the Subscription module.  Think of it like Accounts UI in relation to Accounts.

#### Subscription

This is the module that you'll be working on.  It interfaces with the MongoDB.

#### Subscription Billing

This module is a backend module that reads the MongoDB, creates the invoices in Xero and closes and opens new subscriptions in the MongoDB.

## MongoDB Collection

A mongodb collection will track the subscriptions.  A subscription will start with an "open" status.  When the subscription is past the end date, the object will be duplicated with a new start and end date.  While the object is being copied the status will change to "closing".  A new invoice will be created in Xero and a the new subscription will get added to the mongodb. The recurring billing happens as old subscriptions get replaced with new ones.

## A Sample Mongo Entry for a Subscription
```
{
	_id: standard mongo id object,
	customer_id: mongo id to the customer the subsription is tied to,
	start_date: date the subscription service starts,
	end_date: date the subscription stops,
	repeat_every: 
		false = one time subscription,
		int = number of units,
	repeat_unit:
		false = does not recurre,
		"day",
		"week",
		"month",
		"year",
	repeat_until:
		false = continues until cancelled,
		date = the day this subscription will stop repeating,
	status:
		"open" = a subscription that is currently active,
		"opening" = a subscription that is in the process of being created,
		"closing" = a subscrption that is being closed, while a new one is being opened,
		"closed" = a subscription that has been completed,
		"template" = a subscription profile yet to be activated,
		"trial" = a subscription that is under a trial and is not billed, will convert to real subscription on end_data, 
		"trial_cancelled" = a trial that was never continued,
		"trial_converting" = a trial that is in the process of being duplicated into a real subcription, 
		"trial_converted" = a trial that was converted into a billed subscription,
		"stopped" = a subscription that was stopped,
	is_pro_rated:
		true = the amounts in the items list cover only a portion of the full subscription,
		false = the amounts are the full price,
	billed_item: (an array)
	{
		description: the text description of the item,
		cost: always the full price,
		pro_rated_cost: the price when the subscription is pro rated,
		accounting_code: the code used for tracking revenues,
		repeat:
			true = is an item that repeats,
			false = is a one time charge,
		tax: (an array)
		{
			tax_id: mongo id that refers to the tax colletion
		}
	}
}
```
