Handlebars.registerHelper('dateFormat', function(context, block) {
  if (window.moment) {
    var f = block.hash.format || "MMM Do, YYYY";
    return moment(context).format(f);
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});

Handlebars.registerHelper('formatDesc', function(desc) {
  if(desc.length > 30)
    return desc.substring(0, 30) + '...';
  return desc;
});
