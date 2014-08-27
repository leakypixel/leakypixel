var ContactForm = (function() {
  'use strict';

  function ContactForm(element) {
    this.element = element;
    this.bind();
  }

  ContactForm.prototype.bind = function(tweets) {
    var self = this,
      submit = this.element.getElementsByClassName(".submit");
    this.element.addEventListener("submit", function(e) {
      e.preventDefault();
      self.send(e);
    });
  };

  ContactForm.prototype.postMaster = function(response) {
    console.log(response.success == true);
    if (response.success == true) {
      this.element.classList.add("success");
    } else {
      this.showError(response.error);
    }
  }
  ContactForm.prototype.showError = function(error) {
    this.element.classList.add("error");
    var errorContainer = document.createElement("p");
    errorContainer.innerHTML = error;
    errorContainer.classList.add("error-message");
    this.element.appendChild(errorContainer);
  }

  ContactForm.prototype.send = function(data) {
    var fields = this.element.querySelectorAll("[name]"),
      fieldData = utils.urlEncode(utils.fieldsToArray(fields)),
      self = this;
    utils.post({
      url: "https://www.leakypixel.net/email.php",
      data: fieldData,
      onSuccess: function(response) {self.postMaster(response);}
    });
  };

  return ContactForm;
}());

utils.onReady(function() {
  var ContactForms = document.getElementsByClassName("contact-form");
  if (ContactForms) {
    utils.each(ContactForms, function(element){
      new ContactForm(element);
    });
  }
});
