import Ember from "ember";

export default Ember.ArrayController.extend({

  needs: ['application'],

  actions: {

    newUser: function() {
      var controller = this;

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
});
