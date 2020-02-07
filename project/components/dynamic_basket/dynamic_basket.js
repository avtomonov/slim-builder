$(document).ready(function() {
  EventBus.subscribe("update_items:insales:cart", function(cart) {
    $(".js-dynamic_basket").html(templateLodashRender(cart, "dynamic_basket"));
    // инициализация items
    InSalesUI.initAjaxInstance($(".js-dynamic_basket"));
  });
});
