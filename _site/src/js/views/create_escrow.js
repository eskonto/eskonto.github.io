App.Views.CreateEscrow = Backbone.View.extend({
  
  template: function(context) {
    var source   = $("#create_escrow_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  },

  events: {
    'submit form' : 'process',
    'click .close' : 'hideModal',
    'click #escrow-modal .btn-primary' : 'confirm'
  },

  render: function() {
    this.$el.html(this.template());
    this.show();
  },

  show: function() {
    $('#content').html(this.el);
  },

  process: function(e) {
    e.preventDefault();

    var $desc   = $('#description');
    var $amount = $('#amount');

    if ( $desc.val() === '') {
      $desc.popover({ content: "A description is required" }).popover('show');
      return;
    }

    if ( $amount.val() === '') {
      $amount.popover({ content: "A valid amount of Bitcoin's is required" }).popover('show');
      return;
    }

    var attrs = $(e.currentTarget).serialize();
    var self = this;
    $('#spinner').show();
    $('.btn-primary').prop('disabled', true);

    $.post(App.base_url + '/escrows.json?auth_token=' + App.auth_token(), attrs, function(data) {
      self.generateEscrow(data);
      $('#spinner').hide();
      $('.btn-primary').prop('disabled', false);
    }, 'json');
  },

  generateEscrow: function(escrow) {
    var payment   = Bitcoin.Escrow.CreatePaymentCode(escrow.einva);
    var emailText = 'Hi,\r\n\r\n';
    emailText += 'Payee wants you to join them in an escrow transaction for ' + escrow.amount + 'BTC.\r\n\r\n';
    emailText += 'To accept click on the link below.\r\n\r\n';
    emailText += 'http://eskonto.com/app.html#escrows/' + escrow.uuid + '\r\n\r\n';
    emailText += 'When asked asked for a payment verification code, enter the code below.\r\n\r\n';
    emailText += payment.invitationP;

    $('#escrow-email').val(emailText);
    $('#escrow-modal').modal('show');
  },

  confirm: function(e) {
    e.preventDefault();

    $('#escrow-modal').modal('hide');

    App.Router.navigate('escrows', { trigger: true });
  },

  hideModal: function(e) {
    $('#escrow-modal').modal('hide');
  }

});
