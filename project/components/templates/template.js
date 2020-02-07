/**
 * Получение шаблона Lodash на основе данных
 * @param  {all} content       Данные для шаблона
 * @param  {string} templateId id из аттрибута data-template-id
 * @return {html}
 */
function templateLodashRender(content, templateId) {
  var templateContent = $('[data-template-id="'+templateId+'"]').html();
  var renderContent = _.template(templateContent);

  return renderContent(content);
}

function getDiscount(price, old_price) {
  var sale = '';
  var _merge = Math.round( ((parseInt(old_price) - parseInt(price)) / parseInt(old_price) * 100), 0 )
  if (_merge < 100) {

    sale = '<div class="stiker stiker-sale">' +
           '<span>'+
            'скидка '+_merge+'%'+
            '</span>' +
            '</div>';
  }


  return sale;
};

function getStiker(name, characteristics) {
  var labels_list = "";
  _.forEach(characteristics, function(characteristic) {
    if (
      characteristic.permalink == name ||
      (characteristic.property
        ? characteristic.property.permalink == name
        : false)
    ) {
      labels_list += '<div class="stiker stiker-';
      labels_list += characteristic.permalink;
      labels_list += '"><span>';
      labels_list += characteristic.title;
      labels_list += "</span></div>";
    }
  });

  return labels_list;
};
