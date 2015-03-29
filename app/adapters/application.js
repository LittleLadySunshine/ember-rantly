import ENV from '../config/environment';

export default DS.ActiveModelAdapter.extend({
  host: ENV.adapterURL || ENV.ADAPTER_URL,

  headers: function() {
    var token = localStorage.getItem('authToken');
    if (token) {
      return {
        "Authorization": "" + token
      };
    }
  }.property('signin.authToken')
});
