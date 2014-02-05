App.Views.RedeemEscrow = App.Views.EscrowBaseView.extend({

  template: function(context) {
    var source   = $("#redeem_escrow_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  },

  events: {
    'submit form' : 'process'
  },

  process: function(e) {
    e.preventDefault();

    var $code3 = $('#einvp');

    if ($code3.val().substr(0, 5) != 'einvp') {
      $code3.popover({ content: 'The payment invitation code is invalid' }).popover('show');
    }

    var redeem = Bitcoin.Escrow.Redeem(this.model.get('einva'), this.model.get('einvb'), $code3.val());

    if (redeem) {
      $('#redeem-address').val(redeem.address);
      $('#redeem-wif').val(redeem.wif);
    }
  }

});