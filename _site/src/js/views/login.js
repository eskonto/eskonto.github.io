App.Views.Login = Backbone.View.extend({

  template: function(context) {
    var source   = $("#login_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  },

  events: {
    'submit form': 'process'
  },

  render: function() {
    var ctx = {};
    if (App.location != undefined) {
      ctx['escrow'] = App.location.split('/')[1];
    }
    this.$el.html(this.template(ctx));
    this.show();
  },

  show: function() {
    $('#content').html(this.el);
  },

  process: function(e) {
    e.preventDefault();

    $('.btn-primary').prop('disabled', true);
    $('#spinner').show();

    $.ajax({
      type     : 'post',
      url      : App.base_url + '/users/sign_in.json',
      data     : $(e.currentTarget).serialize(),
      dataType : 'json',
      success  : function(data) {
        $('#logout').show();
        $('#login').hide();
        $('#signup').hide();

        if (data['auth_token']) {
          $.cookie('auth_token', data['auth_token']);
          if (App.location && App.location !== 'login') {
            var loc = App.location;
            App.location = undefined;
            App.Router.navigate(loc, { trigger: true });
          } else {
            App.Router.navigate('escrows', { trigger: true });
          }
        }
      },
      error    : function(data) {
        $('.btn-primary').removeProp('disabled');
        $('#hide').show();
      }
    });
  }

});