import Ember from 'ember';

export default Ember.Controller.extend({

  setupController: function(controller) {
    controller.reset();
  },

  reset: function() {
    this.setProperties({
      email: "",
      password: "",
      errorMessage: ""
    });
  },

  actions: {
    doSearch: function() {
      var input = this.get('term');
      var controller = this;
      var place = document.getElementsByClassName("search-area")[0];

      if ((typeof(input) === 'undefined') || (input === '') || (input === null)) {
        place.placeholder = "This can't be blank!";
        controller.set('search', '');
      } else {
        controller.store.find('rant', {find: input}).then(function (result) {
          controller.set('model', result);
        });
        place.placeholder = "Search";
        controller.set('search', '');
        controller.transitionToRoute('rants.search', { queryParams: {term: input} });
      }
    },

    signIn: function() {
      var controller = this;
      var data = {
        email: this.get("email"),
        password: this.get("password")
      };
      controller.set('errorMessage', null);
      var session = controller.store.createRecord('session', data);
      session.save().then(function(){
        controller.set('loggedIn', true);
        localStorage.setItem('authToken', session._data.token);
        controller.set('currentUser', session._data.user);
        controller.transitionToRoute('rants');
      });
    },

    signOut: function() {
      localStorage.clear();
      this.set('loggedIn', false);
      this.transitionToRoute('rants');
    }
  }
});
