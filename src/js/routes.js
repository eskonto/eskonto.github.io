App.Routers.Navigation = Backbone.Router.extend({

  routes: {
    'escrows'              : 'escrows',
    'escrows/new'          : 'createEscrow',
    'escrows/:id'          : 'showEscrow',
    'escrows/:id/accept'   : 'acceptEscrow',
    'escrows/:id/verify'   : 'verifyEscrow',
    'escrows/:id/release'  : 'releaseEscrow',
    'escrows/:id/redeem'   : 'redeemEscrow',
    'signup'               : 'sign_up',
    'login'                : 'login',
    'logout'               : 'logout',
    '*path'                : 'defaultRoute'
  },

  before: function(route, params) {
    if (App.auth_token() === undefined) {

      $('#login').show();
      $('#signup').show();
      $('#logout').hide();

      if (route === 'escrows/:id') {
        App.location = route.replace(/:id/, params);
      }

      if (route === 'signup') {
        App.Router.navigate('signup');
        var view = new App.Views.SignUp();
        view.render();
      } else if (route === '*path') {
        return true;
      } else {
        App.Router.navigate('login');
        var view = new App.Views.Login();
        view.render();
      }

      return false;
    } else {
      $('#login').hide();
      $('#signup').hide();
      $('#logout').show();
    }
  },

  defaultRoute: function() {
    App.Router.navigate('escrows', { trigger: true });
  },

  escrows: function() {
    var page = new App.Views.EscrowsList();
    page.collection.fetch({ reset: true });
  },

  createEscrow: function() {
    var view = new App.Views.CreateEscrow();
    view.render();
  },

  acceptEscrow: function(id) {
    var view = new App.Views.AcceptEscrow({ id: id });
    view.model.fetch();
  },

  verifyEscrow: function(id) {
    var view = new App.Views.VerifyEscrow({ id: id });
    view.model.fetch();
  },

  releaseEscrow: function(id) {
    var url = App.base_url + '/escrows/' + id + '.json?auth_token=' + App.auth_token();

    $.post(url, { '_method' : 'put' }, function() {
      App.Router.navigate('escrows/' + id, { trigger: true });
    }, 'json');
  },

  redeemEscrow: function(id) {
    var view = new App.Views.RedeemEscrow({ id: id });
    view.model.fetch();
  },

  showEscrow: function(id) {
    var view = new App.Views.ShowEscrow({ id: id });
    view.model.fetch();
  },

  sign_up: function() {
    var view = new App.Views.SignUp();
    view.render();
  },

  login: function() {
    var view = new App.Views.Login();
    view.render();
  },

  logout: function() {
    $.removeCookie('auth_token');
    App.location = undefined;

    $('#login').show();
    $('#signup').show();
    $('#logout').hide();

    App.Router.navigate('login', { trigger: true });
  }

});