
/**
 * This file uses the Page Object pattern to define a test for
 * the diary page
 */

var ContactPage = function() {

	this.firstNameInput = element(by.model('person.firstName'));

	this.lastNameInput = element(by.model('person.lastName'));

	this.addButton = element(by.id('addButton'));


	this.navigate = function() {
		browser.get('index.html#/contacts');
	};

	this.firstNameSendKeys = function(keys) {
		this.firstNameInput.sendKeys(keys);
	};

	this.lastNameSendKeys = function(keys) {
		this.lastNameInput.sendKeys(keys);
	};

	this.submit = function() {
		this.addButton.click();
	};
};

module.exports = new ContactPage();