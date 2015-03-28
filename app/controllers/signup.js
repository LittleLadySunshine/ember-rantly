import Ember from "ember";

export default Ember.ArrayController.extend({

  needs: ['application'],

  actions: {

    newUser: function() {
      var controller = this;

      var firstName = this.get('first'),
      lastName  = this.get('last'),
      email     = this.get('email'),
      password  = this.get('password'),
      passwordConfirmation  = this.get('passwordconfirmation');

      Ember.$(".errors").html('');

      if ((firstName === undefined) || (lastName === undefined) || (email === undefined) || (password === undefined) || (passwordConfirmation === undefined)) {
        Ember.$(".errors").append("<p>" + "Please enter all the fields." + "</p>");
      } else {

        var user = controller.store.createRecord('user',
        { firstName: this.get('first'),
          lastName: this.get('last'),
          email: this.get('email'),
          password: this.get('password'),
          passwordConfirmation: this.get('passwordconfirmation')
        });

        return user.save().then(function(){
          var data = {
            email: controller.get("email"),
            password: controller.get("password")
          };
          controller.set('errorMessage', null);
          var session = controller.store.createRecord('session', data);
          session.save().then(function(){
            controller.set('loggedIn', true);
            localStorage.setItem('authToken', session._data.token);
            localStorage.setItem('currentUser', session._data.user.id);
            controller.set('currentUser', session._data.user);
            // console.log(controller.currentUser);
            controller.transitionToRoute('rants');
          });

          controller.set('firstName', '');
          controller.set('lastName', '');
          controller.set('email', '');
          controller.set('password', '');
          controller.set('passwordConfirmation', '');
        });
      }
    }
  }
});
