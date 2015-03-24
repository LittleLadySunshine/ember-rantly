import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signup');
  this.route('signout');
  this.resource('rants',  { path: '/' }, function() {
    this.route('search',  { path: '/search' });
    this.route('new');
    this.resource('rant', { path:'/rants/:rant_id' }, function() {
      this.route('edit');
    });
  });
  this.resource('users', function() {
    this.resource('user', { path:'/:user_id' }, function() {
      this.route('edit', { path:'/edit' });
    });
  });
});

export default Router;
