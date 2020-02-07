function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
  {
      var spcook =  cookies[i].split("=");
      deleteCookie(spcook[0]);
  }
  function deleteCookie(cookiename)
  {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      var expires = ";expires="+d;
      var name=cookiename;
      //alert(name);
      var value="";
      document.cookie = name + "=" + value + expires + "; path=/acc/html";
  }
  window.location = ""; // TO REFRESH THE PAGE
}

$(document).ready(function() {
  $(document).on('click', '[data-clear-cookies]', function(event) {
    event.preventDefault();
    deleteAllCookies();

    alertify.success('Куки очищены', 4)
  });
  $(document).on('click', '[data-clear-localforage]', function(event) {
    event.preventDefault();
    localforage.clear();

    alertify.success('localforage очищен', 4);
    window.location = ""; // TO REFRESH THE PAGE
  });
  $(document).on('click', '[data-clear-cart]', function(event) {
    event.preventDefault();
    Cart.clear();

    setTimeout(function () {
      alertify.success('Корзина очищена', 4);
      window.location = ""; // TO REFRESH THE PAGE
    }, 3000)
  });
});
