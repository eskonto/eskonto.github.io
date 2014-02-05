App.Views.EscrowBaseView = Backbone.View.extend({

  initialize: function(id) {
    this.model = new App.Models.Escrow(id);
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.show();
  },

  show: function() {
    $('#content').html(this.el);
  }

});