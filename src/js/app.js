window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  base_url: 'http://eskonto.herokuapp.com/',

  auth_token: function() {
    return $.cookie('auth_token');
  },

  initialize: function() {
    App.Router = new App.Routers.Navigation();
    Backbone.history.start();
  }

};
