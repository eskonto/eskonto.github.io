App.Views.SignUp = Backbone.View.extend({
  
  template: function(context) {
    var source   = $("#sign_up_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  },

  events: {
    'submit form' : 'process'
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

    if (this.validate()) {
      $('.btn-primary').prop('disabled', true);
      $('#spinner').show();

      var attrs = $(e.currentTarget).serialize();

      $.post(App.base_url + '/users.json', attrs, function(data) {
        $('#login').hide();
        $('#signup').hide();
        $.cookie('auth_token', data['auth_token']);

        if (App.location && App.location !== 'login') {
          var loc = App.location;
          App.location = undefined;
          App.Router.navigate(loc, { trigger: true });
        } else {
          App.Router.navigate('escrows', { trigger: true });
        }
      }, 'json');
    }
  },

  validate: function() {
    var $email = $('#user_email');
    if ($email.val() == '') {
      $email.popover({ content: "Email is required" }).popover('show');

      return false;
    }

    var $password = $('#user_password');

    if ($password.val().length < 6) {
      $password.popover({ content: "Password must 6 characters or greater" }).popover('show');

      return false;
    }

    var $passwordConfirmation = $('#user_password_confirmation');

    if ($passwordConfirmation.val().length < 6) {
      $passwordConfirmation.popover({ content: "Password must 6 characters or greater" }).popover('show');

      return false;
    }

    if ($password.val() !== $passwordConfirmation.val()) {
      $passwordConfirmation.popover('destroy');
      $passwordConfirmation.popover({ content: "Passwords must match" }).popover('show');

      return false;
    }

    return true;

  }

});
