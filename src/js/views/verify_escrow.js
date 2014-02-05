App.Views.VerifyEscrow = App.Views.EscrowBaseView.extend({

  template: function(context) {
    var source   = $("#verify_escrow_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  },

  events: {
    'submit form' : 'process',
    'click #verify-modal .btn' : 'hideModal'
  },

  process: function(e) {
    e.preventDefault();

    var $code2 = $('#verify-code2');

    if ($code2.val().substr(0, 5) != 'einvp') {
      $code2.popover({ content: 'The payment invitation code is invalid' }).popover('show');
    }

    var verify = Bitcoin.Escrow.VerifyPaymentCode(this.model.get('einvb'), $code2.val());

    if (verify.result) {
      if ($(this).data('role') == 'payer') {
        $('#verification').html('Please send your payment to this bitcoin address <strong>' + verify.address + '</strong>.');
      } else {
        $('#verification').html('Your payment should be sent to this bitcoin address <strong>' + verify.address + '</strong>.');
      }

      var url = App.base_url + '/escrows/' + this.model.get('uuid') + '/verify.json?auth_token=' + App.auth_token();
      var self = this;

      $.post(url, { address: verify.address, _method: 'put' }, function(data) {
        // App.Router.navigate('escrows/' + self.model.get('uuid'), { trigger: true });
      }, 'json');
    } else {
      $('#verification').text(verify.message);
    }

    $('#verify-modal').modal('show');
  },

  hideModal: function(e) {
    e.preventDefault();

    $('#verify-modal').modal('hide');
    
    App.Router.navigate('escrows' + this.model.get('uuid'), { trigger: true });
  }

});