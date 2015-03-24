import Ember from "ember";

export default Ember.ObjectController.extend({

  actions: {
    editUser: function(user) {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var email = this.get('email');
      Ember.$(".errors").html('');

      if (((firstName == null) || (firstName.length === 0)) || ((lastName == null) || (lastName.length === 0)) || ((email == null) || (email.length === 0))) {
        Ember.$(".errors").append("<p>" + "Please enter all fields." + "</p");
      } else if (firstName && lastName && email) {
        user.set('firstName', firstName);
        user.set('lastName', lastName);
        user.set('email', email);
        user.save().then(function() {
          this.transitionToRoute('users');
        }.bind(this));
      }
    },

    deleteUser: function(user) {
      user.deleteRecord();
      user.save().then(function(){
        this.transitionToRoute('users');
      }.bind(this));
    }
  },

  fullName: function() {
    return this.get("first_name") + " " + this.get("last_name");
  }.property('first_name', 'last_name')

});
