$(document).ready(function() {
  var myGeo = new GeoManager({
   succes: function (geoData) {
     console.log(geoData);
     $('.js-city-name').html(geoData.city);
   }
  });

  $(document).on('submit', '.js-city-form', function(event) {
    event.preventDefault();
    var newCity = $(this).find('[name="city"]').val();
    if (newCity && newCity != '') {
      myGeo.setLocalData({city: newCity}, function () {
        console.log('Данные обновлены');
      })
    }
  });
});
