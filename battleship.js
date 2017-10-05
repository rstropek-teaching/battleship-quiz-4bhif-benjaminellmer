$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.

    ships = {"Carrier" : 5, "Battleship" : 4 , "Cruiser" : 3,"Submarine" :	3,"Destroyer" :	2};
    var size = 0;

    for (var key in ships) {
      if (ships.hasOwnProperty(key)) {
        c = Math.floor(Math.random() * 10);
        r = Math.floor(Math.random() * 10);
        while($('td[data-r="'+r+'"][data-c="'+c+'"]').hasClass('ship') || isSingle(c,r)){
          c = Math.floor(Math.random() * 10);
          r = Math.floor(Math.random() * 10);
        }
        $('td[data-r="'+r+'"][data-c="'+c+'"]').removeClass('water').addClass('ship');
        size = ships[key] - 1;
        for(i = 0; i < size; i++){
          direction = findeAvailableDirection(c,r);
          
          switch(direction){
            case 1:
              r = r + 1;
              break;
            case 2:
              r = r -1;
              break;
            case 3:
              c = c - 1;
              break;
            case 4:
              c = c +1;
          }

          $('td[data-r="'+r+'"][data-c="'+c+'"]').removeClass('water').addClass('ship');
        }
      }
  }
  });
});
function surroundedWithShips(c, r){
  var surrounded = $('td[data-r="'+r+1+'"][data-c="'+c+'"]').hasClass('ship') 
            && $('td[data-r="'+r-1+'"][data-c="'+c+'"]').hasClass('ship') 
            && $('td[data-r="'+r+'"][data-c="'+c+1+'"]').hasClass('ship') 
            && $('td[data-r="'+r+'"][data-c="'+c-1+'"]').hasClass('ship');
  
  return surrounded;
}
function isSingle(c,r){
  var single = $('td[data-r="'+(r+1)+'"][data-c="'+c+'"]').hasClass('ship') 
        || $('td[data-r="'+(r-1)+'"][data-c="'+c+'"]').hasClass('ship') 
        || $('td[data-r="'+r+'"][data-c="'+(c+1)+'"]').hasClass('ship') 
        || $('td[data-r="'+r+'"][data-c="'+(c-1)+'"]').hasClass('ship')
        || $('td[data-r="'+(r+1)+'"][data-c="'+(c+1)+'"]').hasClass('ship')
        || $('td[data-r="'+(r-1)+'"][data-c="'+(c-1)+'"]').hasClass('ship')
        || $('td[data-r="'+(r+1)+'"][data-c="'+(c-1)+'"]').hasClass('ship')
        || $('td[data-r="'+(r-1)+'"][data-c="'+(c+1)+'"]').hasClass('ship')

  return single;
}
function findeAvailableDirection(c,r){
  directions = [];    //-> 1 = up, 2 = down, 3 = left, 4 = rights
  if(!$('td[data-r="'+(r+1)+'"][data-c="'+c+'"]').hasClass('ship'))
    directions.push(1);
  if(!$('td[data-r="'+(r-1)+'"][data-c="'+c+'"]').hasClass('ship'))
    directions.push(2);
  if(!$('td[data-r="'+r+'"][data-c="'+(c-1)+'"]').hasClass('ship'))
    directions.push(3);
  if(!$('td[data-r="'+r+'"][data-c="'+(c+1)+'"]').hasClass('ship'))
    directions.push(4);
  
  if(!directions.empty()){
    d = Math.floor(Math.random() * directions.size());
  }
  return d;
}