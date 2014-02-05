App.Views.ShowEscrow = App.Views.EscrowBaseView.extend({

  template: function(context) {
    var source   = $("#escrow_tmpl").html();
    var template = Handlebars.compile(source);

    return template(context);
  }

});