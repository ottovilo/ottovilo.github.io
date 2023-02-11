/** CART FUNCTIONS START **/
function tryAdd(sessionID, elem, productID, notifyMsg) {

    var cl = elem.closest('.js-cart-vars');

    // määrä
    var qty = 1;
    if (cl.querySelector('input[name="quantity"]')) {
        var qty = parseInt(cl.querySelector('input[name="quantity"]').value);
    }

    // määrä joka on ostettavissa
    var max_can_buy = 1000;
    if (cl.getAttribute('data-max-can-buy')) {
        max_can_buy = cl.getAttribute('data-max-can-buy');
    }

    // variaatio 1 (esim materiaali)
    variation1 = 0;
    if (cl.querySelector('input[name="variation1"]')) {
        var variation1 = cl.querySelector('input[name="variation1"]').value;
    }
    // variaatio 2 (esim väri)
    variation2 = 0;
    if (cl.querySelector('input[name="variation2"]')) {
        var variation2 = cl.querySelector('input[name="variation2"]').value;
    }
    // accessory tuotteet
    accIDs = 0;
    var accIDs_array = '';
    if (cl.querySelector('input[name="accIDs"]')) {
        var accIDs = cl.querySelector('input[name="accIDs"]').value;
        if (typeof accIDs !== "undefined") {
            accIDs_array = (accIDs.trim() !== '') ? accIDs.split(',') : '';
        }
    }

    // hinta
    var product_price_elem = document.getElementsByClassName("js-product-price");
    var product_price = parseFloat(product_price_elem[0].getAttribute("data-price"));

    // tarkistetaan vielä, että jos kyseessä on lahjakortti niin että minimiarvo on asetettu
    if (cl.querySelector('input[name="open_value"]')) {
        var giftcarg_value = parseFloat(cl.querySelector('input[name="open_value"]').value);
        if (isNaN(giftcarg_value)) {
            showShopMessage('Syötä lahjakortin arvo', 'product_added', 2000);
            throw new Error('');
        }
        var min_value = parseFloat(cl.querySelector('input[name="open_value"]').getAttribute('min'));
        if (min_value > product_price) {
            showShopMessage('Lahjakortin minimiarvo on '+min_value + '&euro;', 'product_added', 2000);
            throw new Error('Required');
        }
    }

    // uniikki ID jolla erotellaan tuotteet ostoskorissa
    var rowID = productID+variation1+variation2+accIDs;

    /** GOOGLE ENHANCED ECOMMERCE START **/
    var list_from = '';
    if (document.getElementsByName("ecommerce_list_from").length > 0) {
        list_from = document.getElementsByName("ecommerce_list_from")[0].value; // listaus josta saavuttiin ostoskoriin lisäämiseen
    }

    var product_name = '';
    if (document.getElementsByName("ecommerce_product_name").length > 0) {
        product_name = document.getElementsByName("ecommerce_product_name")[0].value; // nimi
    }
    var category_name = '';
    if (document.getElementsByName("ecommerce_category_name").length > 0) {
        category_name = document.getElementsByName("ecommerce_category_name")[0].value; // kategoria
    }
    /** GOOGLE ENHANCED ECOMMERCE END **/

    // Lisätään ostoskoriin
    addToShoppingCart(
        sessionID, 
        rowID,
        '',
        productID, 
        variation1, 
        variation2, 
        qty, 
        max_can_buy,
        accIDs_array, 
        list_from, 
        product_name, 
        category_name, 
        product_price, 
        notifyMsg
    );
}


function tryAddOne(sessionID, elem, productID, giftcardtype, product_name, notifyMsg, product_price) {

    // määrä
    var qty = 1;
    
    // määrä joka on ostettavissa
    var max_can_buy = 1000;

    // variaatio 1 (esim materiaali)
    var variation1 = 0;

    // variaatio 2 (esim väri)
    var variation2 = 0;
    
    // accessory tuotteet
    var accIDs = 0;
    var accIDs_array = '';
    /*
    if (cl.querySelector('input[name="accIDs"]')) {
        var accIDs = cl.querySelector('input[name="accIDs"]').value;
        if (typeof accIDs !== "undefined") {
            accIDs_array = (accIDs.trim() !== '') ? accIDs.split(',') : '';
        }
    }
    */

    // hinta
    //var product_price_elem = document.getElementsByClassName("js-product-price");
    //var product_price = parseFloat(product_price_elem[0].getAttribute("data-price"));
    //var product_price = 10;

    // tarkistetaan vielä, että jos kyseessä on lahjakortti niin että minimiarvo on asetettu
    /*
    if (cl.querySelector('input[name="open_value"]')) {
        var giftcarg_value = parseFloat(cl.querySelector('input[name="open_value"]').value);
        if (isNaN(giftcarg_value)) {
            showShopMessage('Syötä lahjakortin arvo', 'product_added', 2000);
            throw new Error('');
        }
        var min_value = parseFloat(cl.querySelector('input[name="open_value"]').getAttribute('min'));
        if (min_value > product_price) {
            showShopMessage('Lahjakortin minimiarvo on '+min_value + '&euro;', 'product_added', 2000);
            throw new Error('Required');
        }
    }
    */
   
    // uniikki ID jolla erotellaan tuotteet ostoskorissa
    var rowID = productID+variation1+variation2+accIDs;

    /** GOOGLE ENHANCED ECOMMERCE START **/
    var list_from = '';
    /*
    if (document.getElementsByName("ecommerce_list_from").length > 0) {
        list_from = document.getElementsByName("ecommerce_list_from")[0].value; // listaus josta saavuttiin ostoskoriin lisäämiseen
    }
    */

    //var product_name = '';
    /*
    if (document.getElementsByName("ecommerce_product_name").length > 0) {
        product_name = document.getElementsByName("ecommerce_product_name")[0].value; // nimi
    }
    */
    var category_name = '';
    /*
    if (document.getElementsByName("ecommerce_category_name").length > 0) {
        category_name = document.getElementsByName("ecommerce_category_name")[0].value; // kategoria
    }
    */
   
    /** GOOGLE ENHANCED ECOMMERCE END **/

    // Lisätään ostoskoriin
    addToShoppingCart(
        sessionID, 
        rowID,
        '',
        productID, 
        variation1, 
        variation2, 
        qty, 
        max_can_buy,
        accIDs_array, 
        list_from, 
        product_name, 
        category_name, 
        product_price, 
        notifyMsg,
        giftcardtype
    );
}




function printOstoskori(sessionID) {
    var ostoskori = JSON.parse(localStorage.getItem(sessionID));
    console.log(ostoskori);
}


function padTime(timevalue) {
    if (timevalue < 10) {
        return '0'+timevalue;
    } else{
        return timevalue;
    }
}

function addToShoppingCart(sessionID, rowID, parentID, productID, variation1, variation2, qty, max_can_buy, accIDs_array, list_from, product_name, category_name, product_price, notifyMsg, giftcardtype) {
        
     console.log('rowID: '+rowID);   
     console.log('parentID: '+parentID);   
     console.log('productID: '+productID);   
     console.log('variation1: '+variation1);   
     console.log('variation2: '+variation2);   
     console.log('giftcardtype: '+giftcardtype);   
     console.log('qty: '+qty);   
     console.log('max_can_buy: '+max_can_buy);   
     console.log('accIDs_array: '+accIDs_array);   
     console.log('list_from: '+list_from);   
     console.log('product_name: '+product_name);   
     console.log('category_name: '+category_name);   
     console.log('product_price: '+product_price);   
     console.log('notifyMsg: '+notifyMsg);   
         
     const currentDate = new Date();
     var datestr = currentDate.toISOString().substring(0,10);
     console.log('date - '+datestr);
     var timestr = padTime(currentDate.getHours()) + ":" + padTime(currentDate.getMinutes());
     console.log('time - '+timestr);
     
     var cardinfo = {
         value: product_price,
         giftcardtype: giftcardtype, 
         send_date: datestr,
         send_time: timestr,
         ajastettu: 0,
         name: '',
         email: '',
         message: ''
     }
     
    var cardinfoarray = [ cardinfo ];
         
    var tuote = {
        rowID: rowID, 
        parentID: parentID, 
        productID: productID, 
        giftcardtype: giftcardtype, 
        qty: qty, 
        variation1: variation1, 
        variation2: variation2, 
        list_from: list_from, 
        cardinfo: cardinfoarray,
        product_name: product_name, 
        category_name: category_name, 
        product_price: product_price
    };

    if (localStorage.getItem(sessionID)) {
        var ostoskori = JSON.parse(localStorage.getItem(sessionID));
    } else {
        var ostoskori = [];
    }

    console.log(ostoskori);   
     
    if (ostoskori && ostoskori.length > 0) {
        //luupataan ostoskori
        for (var i = 0; i < ostoskori.length; i++) {
            
            // Tuote löytyi jo ostoskorista samalla päätuote-accessory combolla, lisätään rivin määrää
            if (ostoskori[i].rowID == rowID && ostoskori[i].rowID !== '' && ostoskori[i].productID == productID) {
                // JOS ostoskorissa oleva määrä ei ylitä ostettavissa olevaa määrää
                if (parseInt(ostoskori[i].qty) < parseInt(max_can_buy)) {
                    ostoskori[i].qty = (parseInt(ostoskori[i].qty) + 1).toString();
                } else {
                    notifyMsg = out_of_stock_txt_not_added_to_cart + ' ' + max_can_buy;
                }
                if (ostoskori[i].cardinfo == null) {
                    console.log('cardinfo on null');
                    ostoskori[i].cardinfo = [];
                    for(var ci=0;i<ostoskori[i].qty; ci++) {
                        var emptycardinfo = {
                            value: product_price,
                            name: '',
                            giftcardtype: giftcardtype,
                            ajastettu: 0,
                            send_date: datestr,
                            send_time: timestr,
                            email: '',
                            message: ''
                        }
                        ostoskori[i].cardinfo.push(emptycardinfo);
                    }
                } else {
                    ostoskori[i].cardinfo.push(cardinfo);
                    console.log('cardinfocount - '+ostoskori[i].cardinfo.length);
                }
                console.log(' - onjo');
                var onjo = true;
                break;
            }
            // Accessory tuote löytyi jo ostoskorista samalla päätuote-accessory kombolla, lisätään accessory rivin määrää
            if (ostoskori[i].parentID == parentID && ostoskori[i].parentID !== '' && ostoskori[i].productID == productID) {
                ostoskori[i].qty = (parseInt(ostoskori[i].qty) + 1).toString();
                console.log(' - onjo2');
                var onjo = true;
                break;
            }
        }
        if (!onjo) {
            ostoskori.push(tuote);
        }
    } else {
        console.log(' - push tuote');
        ostoskori.push(tuote);
    }
    console.log(' - ostoskori setti');
    localStorage.setItem(sessionID, JSON.stringify(ostoskori));

    
    // Lisätään myös accessory tuotteet omana rivinään 
    if (accIDs_array !== '') {
        // addAccessoriesToShoppingCart(rowID, accIDs_array, qty, parentID, notifyMsg); TODO (kts. tapioanttilasta logiikka)
    } else {
        if (document.getElementById('product-modal')) {
            if (document.getElementById('product-modal').style.display !== 'block') {
                showShopMessage(''+notifyMsg+'', 'product_added', 2000);
            } else {
                location.reload();
            }
        } else {
            showShopMessage(''+notifyMsg+'', 'product_added', 2000);
        }
        
        updateCountTuotteet(sessionID);
    }
    updateCountTuotteet('CART');
}


function scheduleToggleChanged(checkbox, cardID) {
    console.log('schedule');
    
    if (checkbox.checked == true) {
        console.log('checked true');
        var element = document.getElementById('cardchedulingdiv-'+cardID);
        console.log(' - cardchedulingdiv-'+cardID);
        element.style.display = 'block';
    } else {
        console.log('checked false');
        var element = document.getElementById('cardchedulingdiv-'+cardID);
        element.style.display = 'none';
    }
    
    //
    //
    //
//var checkbox = document.getElementById('cardchedulingdiv-'+cardID);
    //var element = document.getElementById('cardchedulingdiv-'+cardID);
    
    
    
}
     
     

function updateShoppingCartNotice() {
    var cartcount = 0;
    if (localStorage.getItem('CART')) {
        cartcount = JSON.parse(localStorage.getItem('CART')).length;
    }
    var notice_me = $('header').find('.js-notice-me');
    if (cartcount > 0) {
        notice_me.css({display: 'flex'});
        notice_me.html(cartcount);
    } else {
        notice_me.html('');
        notice_me.css({display: 'none'});
    }
}
     
     
                       
function deleteCartItem(elem, sessionID, notifyMsg, productID) {
    
    console.log('remove product - '+productID);
    
    //jos voi poistaa, on ostoskori oltava..
    var ecommerce_quantity = elem.closest('.js-tilausrivi').querySelector('.js-quantity-per-product').value;
    var productID = elem.getAttribute('data-productID');
    var rowID = elem.closest('.js-shopping-cart-item').getAttribute('data-rowid');
    // eeCommerceRemoveCart(productID, ecommerce_quantity, 'ostoskori', rowID);
    
    //console.log('remove product - '+productID);
    var ostoskori = JSON.parse(localStorage.getItem('CART'));

    
    if (ostoskori && ostoskori.length > 0) {
        //console.log('ostoskori search');
      for (var i = 0; i < ostoskori.length; i++) {
        console.log('loop product - '+i+', productID:'+productID);
        //console.log('ostoskori product - '+ostoskori[i].productID);
        if (parseInt(ostoskori[i].productID) == parseInt(productID)) {
            console.log(' ------------- remove product found - '+productID);
            delete ostoskori[i];
        }
      }
      ostoskori = ostoskori.filter(function (x) {
        return x !== null
      });
      localStorage.setItem(sessionID, JSON.stringify(ostoskori));
    }
    
    var ostoskori_after = JSON.parse(localStorage.getItem(sessionID));
    
    if (ostoskori_after.length === 0) {
        location = 'fi/etusivu';
    }
    
    var remove_after = elem.getAttribute('data-remove-after');
    elem.closest(remove_after).remove();
    if (notifyMsg !== '') {
        showShopMessage(''+notifyMsg+'', 'product_removed', 1000);
    }
    
    updateCountTuotteet('CART');
    calculateTotal('test');
    
    /*
    var ostoskori_after = JSON.parse(localStorage.getItem(sessionID));
  
  
    if (ostoskori_after && ostoskori_after.length > 0) {
        for (var i = 0; i < ostoskori_after.length; i++) {
            if (productIDs_str == '') {
                productIDs_str =  parseInt(ostoskori_after[i].productID);
            } else {
                productIDs_str += ','+ parseInt(ostoskori_after[i].productID);
            }
        }
    }
    */
   
    /*
    if (ostoskori_after.length === 0) {
        location.reload();
    }
    */
   
    /*
    var remove_after = elem.getAttribute('data-remove-after');
    elem.closest(remove_after).remove();
    
    calculateTotal(productIDs_str);
    if (notifyMsg !== '') {
        showShopMessage(''+notifyMsg+'', 'product_removed', 1000);
    }
    */
    //updateCountTuotteet(sessionID);
}



function decreaseQuantity(elem, sessionID, action, productprice) {
    
    console.log('---------------------------------------------------');
    console.log('decreaseQuantity');
    
    var tuoteID = elem.closest('.js-tuote-maara').getAttribute('data-tuoteID');
    console.log('tuoteID - '+tuoteID);
    var input = elem.closest('.js-tuote-maara').querySelector('input[name=qty]');
    var old_quantity = input.value;
    
    if (old_quantity == '1') {
        return;
    }

    var cardinfoID = 'cardinfo-' + tuoteID + '-' + (old_quantity);
    var element = document.getElementById(cardinfoID);
    console.log('elementID - '+cardinfoID);
    var ostoskori = JSON.parse(localStorage.getItem(sessionID));
    console.log('old_quantity - '+old_quantity);
    
    
    
    var newValue = parseInt(old_quantity) - 1;
    //console.log('cardinfoID - '+cardinfoID);
    //console.log('newValue - '+newValue);
    
    if (element == null) {
        console.log('element null');
    } else {
        console.log('element not null');
        element.remove();
        
        console.log(ostoskori);
        if (ostoskori && ostoskori.length > 0) {
            for (var i = 0; i < ostoskori.length; i++) {
                if (ostoskori[i].productID == tuoteID) {
                    console.log(' - product found, cardinfo lenth - '+ostoskori[i].cardinfo.length);
                    ostoskori[i].qty = newValue;
                    if (ostoskori[i].cardinfo.length >= old_quantity) {
                        while(ostoskori[i].cardinfo.length > newValue) {
                            ostoskori[i].cardinfo.pop();
                        }
                    } else {
                        console.log(' - do not remove infos, not enough');
                    }
                }
            }
        }
        input.value = newValue;
    }
    
    localStorage.setItem(sessionID, JSON.stringify(ostoskori));
    updateCountTuotteet('CART');
    calculateTotal('test');
}
    
    
function padTime(timeValue) {
    if(parseFloat(timeValue) < 10) {
        console.log('less than ten');
        return '0' + timeValue;
    } else {
        console.log('creater than ten');
        return timeValue;
    }
}
    
function increaseQuantity(elem, sessionID, action, productprice, giftcardtype) {
    
    console.log('---------------------------------------------------');
    console.log('increaseQuantity');
    
    var tuoteID = elem.closest('.js-tuote-maara').getAttribute('data-tuoteID');
    console.log('tuoteID - '+tuoteID);
    console.log('sessionID - '+sessionID);
    var input = elem.closest('.js-tuote-maara').querySelector('input[name=qty]');
    var old_quantity = input.value;
    //var cardinfoID = 'cardinfo-' + tuoteID + '-' + (old_quantity-1);
    //var element = document.getElementById(cardinfoID);
    var ostoskori = JSON.parse(localStorage.getItem(sessionID));
    //console.log('old_quantity - '+old_quantity);
    var newValue = parseInt(old_quantity) + 1;
    //console.log('cardinfoID - '+cardinfoID);
          
         
     const currentDate = new Date();
     var datestr = currentDate.toISOString().substring(0,10);
     console.log('date - '+datestr);
     var timestr = padTime(currentDate.getHours()) + ":" + padTime(currentDate.getMinutes());
     console.log('time - '+timestr);
     
    
        console.log(ostoskori);
        if (ostoskori && ostoskori.length > 0) {
            
            for (var i = 0; i < ostoskori.length; i++) {
                if (ostoskori[i].productID == tuoteID) {
                    
                    if (ostoskori[i].cardinfo != null) {
                        console.log(' - product found, cardinfo lenth - '+ostoskori[i].cardinfo.length);
                        ostoskori[i].qty = newValue;
                        console.log('newValue qty - '+newValue);

                        var emptycardinfo = {
                                value: productprice,
                                giftcardtype: giftcardtype,
                                 ajastettu: 0,
                                send_date: datestr,
                                send_time: timestr,
                                name: '',
                                email: '',
                                message: ''
                            }
                        ostoskori[i].cardinfo.push(emptycardinfo);
                   } else {
                       console.log(' cardinfo nulli');
                       var emptycardinfo = {
                                value: productprice,
                                giftcardtype: giftcardtype,
                                ajastettu: 0,
                                send_date: datestr,
                                send_time: timestr,
                                name: '',
                                email: '',
                                message: ''
                            }
                        ostoskori[i].cardinfo = [];
                        ostoskori[i].cardinfo.push(emptycardinfo);
                   }
                } else {
                    console.log('product mismatch - '+ostoskori[i].productID + ' vs. '+tuoteID);
                }
            }
        } else {
            console.log('some otehr');
        }
        input.value = newValue;
        
    var paramsData = {
        tuoteID: tuoteID,
        cardtype: giftcardtype,
        index: (newValue)
    }
    input.value = newValue;
    
    localStorage.setItem(sessionID, JSON.stringify(ostoskori));
    
    const params = encodeQueryData(paramsData);
    const callbackArgs = [tuoteID, newValue];
    const responseType = 'html';
    httpRequestHandler('get', 'ajax/get-giftcard-content/', params, responseType, addCardInfoElement, callbackArgs);
    updateCountTuotteet('CART');
    calculateTotal('test');
}
    
    
function addCardInfoElement(tuoteID, cardIndex, requestResponse) {
    
    console.log('tuoteID - '+tuoteID);
    console.log('cardIndex - '+cardIndex);
    
    var element = document.getElementById("cardinfocontent-"+tuoteID);
    if (element == null) {
        console.log('element is null');
    } else {
        console.log('element - not null');
        var elem = document.createElement("div");
        elem.id = "cardinfo-" + tuoteID + "-" + cardIndex;
        console.log('adding...'+elem.id);
        elem.className = 'collapse-module mw1000 m-auto b-pad';
        elem.innerHTML = requestResponse;
        element.appendChild(elem);
    }
    updateCountTuotteet('CART');
    calculateTotal('test');
}
  
    
function updateQuantity(elem, sessionID, action) {
    
    console.log('updateQuantity');
    
    var cond = true;
    var cond_false_msg = '';
    var maara = 0;
    var input = elem.closest('.js-tuote-maara').querySelector('input[name=qty]');
    var tuoteID = elem.closest('.js-tuote-maara').getAttribute('data-tuoteID');
    var max_can_buy = elem.getAttribute('data-max-can-buy');
    var rowID = elem.closest('.js-shopping-cart-item').getAttribute('data-rowid');

    var ostoskori = JSON.parse(localStorage.getItem(sessionID));
    var old_quantity = input.getAttribute('data-old-quantity');

    console.log('tuoteID - '+tuoteID);
    var cardinfoID = 'cardinfo-' + tuoteID + '-' + old_quantity;
    var element = document.getElementById(cardinfoID);
    if (element == null) {
        console.log('element null');
    } else {
        console.log('element not null');
        element.remove();
        
        console.log(ostoskori);
       
    }

    if (action === '-') {
        maara = parseInt(input.value) - 1;
        var ecommerce_quantity = 1;
        var ecommerce_action = 'remove';
        cond = (max_can_buy >= maara && maara > 0);
    } else if (action === '+') {
        maara = parseInt(input.value) + 1;
        var ecommerce_quantity = 1;
        var ecommerce_action = 'add';
        cond = (max_can_buy >= maara);
        cond_false_msg = no_more_products_are_available;
    } else {
        maara = parseInt(input.value);
        cond = (max_can_buy >= maara && maara > 0);
        // ecommercea varten muuttunut määrä
        if (old_quantity > maara) {
            var ecommerce_quantity = old_quantity - maara;
            var ecommerce_action = 'remove';
        } else {
            var ecommerce_quantity = maara - old_quantity;
            var ecommerce_action = 'add';
            cond_false_msg = no_more_products_are_available;
        }
    }

    if (cond) {
        input.value = maara;
        var productIDs_str = '';
        //päivitetään sessionStorage
        if (ostoskori && ostoskori.length > 0) {
            for (var i = 0; i < ostoskori.length; i++) {
                if (parseInt(ostoskori[i].rowID) === parseInt(rowID)) {
                    ostoskori[i].qty = maara.toString();
                }
                if (ostoskori[i].parentID == rowID) {
                    ostoskori[i].qty = maara.toString();
                }
                if (productIDs_str == '') {
                    productIDs_str =  parseInt(ostoskori[i].productID);
                } else {
                    productIDs_str += ','+ parseInt(ostoskori[i].productID);
                }
            }
        }

        localStorage.setItem(sessionID, JSON.stringify(ostoskori));
    
    } else {
        input.value = old_quantity;
        if (cond_false_msg !== '') {
            showShopMessage(''+cond_false_msg+'', 'product_removed', 2000);
        }
    }
    // checkAddRemove(sessionID); // Tarviikohan tätä..
    
    updateCountTuotteet('CART');

    
}

/*
function checkAddRemove(sessionID) {  // Tarviikohan tätä..

    var ostoskori = document.querySelector('#shoppingCartJS');
    var addRemoveButtons = ostoskori.querySelector('.js-add-quantity,.js-remove-quantity');
    for (var i = 0; i < addRemoveButtons.length; i++) {
        addButtons[i].classList.remove('disabled');
    }
    var addButtons = ostoskori.querySelectorAll('.js-add-quantity');
    
    for (var i = 0; i < addButtons.length; i++) {
        var maara = addButtons[i].closest('.js-tuote-maara').querySelector('input[name=qty]').value;
        var max_can_buy = addButtons[i].getAttribute('data-max-can-buy');
        if (parseInt(maara) >= parseInt(max_can_buy) && parseInt(max_can_buy) !== -1) {
            addButtons[i].classList.add('disabled');
        }
    }

    var removeButtons = ostoskori.querySelectorAll('.js-remove-quantity');
    for (var i = 0; i < removeButtons.length; i++) {
        var maara = removeButtons[i].closest('.js-tuote-maara').querySelector('input[name=qty]').value;
        var max_can_buy = removeButtons[i].getAttribute('data-max-can-buy');
        if (parseInt(maara) <= 1) {
            addButtons[i].classList.add('disabled');
        }
    }
    updateCountTuotteet(sessionID);
} */

function updateCountTuotteet(sessionID) {

    var qty = 0;
    var ostoskori = JSON.parse(localStorage.getItem(sessionID));
    if (ostoskori && ostoskori.length > 0) {
        for (var i = 0; i < ostoskori.length; i++) {
            if (ostoskori[i].rowID !== '') {
                qty += parseInt(ostoskori[i].qty);
            }
        }
    }
    // TODO class
    /*
    var cartQtyElem = document.getElementById('min-cart-quantity-js');
    var cartQtyElemMobile = document.getElementById('min-cart-quantity-mobile-js');
    */

    var cartQtyElems = document.querySelectorAll('.min-cart-quantity');
    if (cartQtyElems.length > 0) {
        for (var i = 0; i < cartQtyElems.length; i++) {
            if (qty > 0) {
                cartQtyElems[i].style.display = 'block';
                cartQtyElems[i].setAttribute('data-content', qty);
                
                // kuinka kauan ostoskoria säilytetään localstoragessa käytettäväksi
                const now = new Date();
                localStorage.setItem(sessionID+'_expire', now.getTime() + 3600);
            } else {
                cartQtyElems[i].style.display = 'none';
            }
        }
    }
}

function checkSession(sessionID) {
    if (localStorage.getItem(sessionID+'_expire')) {
        const now = new Date();
        const item = JSON.parse(localStorage.getItem(sessionID+'_expire'));
        if (now.getTime() > item.expiry) {
            // Määritelty aika on mennyt, nollataan ostoskori
            localStorage.removeItem(sessionID);
            localStorage.removeItem(sessionID+'_expire');
            return false;
        }
    }
    return true;
}

function clearSession(sessionID) {
    if (localStorage.getItem(sessionID+'_expire')) {
        localStorage.removeItem(sessionID+'_expire');
    }
    if (localStorage.getItem(sessionID)) {
        localStorage.removeItem(sessionID);
        console.log('remove');
    }
}

function getTinyShoppingCart(lang) {
    if (document.getElementById('tinyShoppingCartItemsJS').style.display == 'none') {
        var sessionID = 'CART';
        // Ladataan ostoskori
        var ostoskori = localStorage.getItem(sessionID);
        if (typeof ostoskori !== 'undefined' && ostoskori !== null) {
            var ostoskori_array = JSON.parse(ostoskori);
            var ostoskori_length = ostoskori_array.length;
        } else {
            var ostoskori_length = 1;
        }
        
        if (typeof ostoskori !== 'undefined' && ostoskori !== null && ostoskori_length !== 0) {
            getShoppingCartItems(sessionID, lang, 'tinyShoppingCartItemsJS', 'ajax/get-tiny-shopping-cart/');
        }
        document.getElementById('tinyShoppingCartItemsJS').style.display = 'block';
    } else {
        document.getElementById('tinyShoppingCartItemsJS').style.display = 'none';
    }
}

function getShoppingCartItems(sessionID, lang, DOMcontainter, url) {
    if (localStorage.getItem(sessionID)) {
        var session_ok = checkSession(sessionID);
        if (session_ok) {
            var form_data = new FormData();
            form_data.append('lang', lang);
            form_data.append('cart', localStorage.getItem(sessionID));
            form_data.append('sessionID', sessionID);

            var ostoskori = JSON.parse(localStorage.getItem(sessionID));
            console.log('getShoppingCartItems');
            console.log('ulr - '+url);
            console.log(ostoskori);
            var productIDs_str = '';
            for (var i = 0; i < ostoskori.length; i++) {
                if (productIDs_str == '') {
                    productIDs_str =  parseInt(ostoskori[i].productID);
                } else {
                    productIDs_str += ','+ parseInt(ostoskori[i].productID);
                }
            }
            console.log('form_data');
            console.log(form_data);
            
            const callbackArgs = [DOMcontainter, productIDs_str, sessionID];
            const responseType = 'html';
            httRequestHanlder('post', url, form_data, responseType, showCart, callbackArgs);
        } else {
            location.reload();
        }
    } else {
        location.reload();
    }
}

function showCart(DOMcontainer, productIDs_str, sessionID, requestResponse) {
    //console.log('showCart - 1');
    //console.log('requestResponse');
    //console.log(requestResponse);
    showAjaxContent(DOMcontainer, requestResponse);
    const htmlContent = document.getElementById(DOMcontainer);
    accessoryRows = htmlContent.querySelectorAll('.accessory-row');
    if (accessoryRows.length > 0) {
        // TODO looppissa uniikit data-parentID:t (kts. tapioanttilasta logiikka)
        // loop {}
        // calculateLinePrice(parentRowArray);
    }

    // poistetaan ostoskorista sellaiset rivit joiden määrä asetettu 0:ksi (tarkoittaa sitä, että varastossa 0 tai tuote poistunut)
    var row_quantities = document.querySelectorAll('.js-tilausrivi');
    for (var i = 0; i < row_quantities.length; i++) {
        var qty = parseInt(row_quantities[i].querySelector('input[name="qty"]').value);
        if (qty == 0) {
            deleteCartItem(row_quantities[i].querySelector('.js-remove-product'), sessionID, '');
        }
    }

    // Total/Yhteensä hintojen esitys
    updateCountTuotteet('CART');
    calculateTotal(productIDs_str);
}


function updateGiftCardSum(cartID, productID, cardIndex) {
    
    console.log('updateGiftCardSum');
    
    if (localStorage.getItem('CART')) {
        
        var element = document.getElementById('summa-'+cartID);
        var newValue = element.value;
        var origValue = parseFloat(element.value.replaceAll(',','.'));
        var roundedValue = Math.round(origValue);
        
        console.log('roundedvalue - '+roundedValue);
        
        if (roundedValue != origValue) {
            console.log('values differ...');
            element.value = roundedValue;
            newValue = roundedValue;
        }
        
        totalsum = 0;
        var ostoskori = JSON.parse(localStorage.getItem('CART'));
        console.log(ostoskori);
        for (var i = 0; i < ostoskori.length; i++) {
                
                if (ostoskori[i].productID == productID) {
                    if (ostoskori[i].cardinfo == null) {
                            console.log('cardinfo is null...' +i);
                    } else {
                        for(var a = 0;a<ostoskori[i].cardinfo.length;a++) {
                            
                            if (a == (cardIndex-1)) {
                                ostoskori[i].cardinfo[a].value = newValue;
                                totalsum = totalsum + parseFloat(newValue);
                            } else {
                                totalsum = totalsum + parseFloat(ostoskori[i].cardinfo[a].value);
                            }
                        }
                    }
                }
        }
        localStorage.setItem('CART', JSON.stringify(ostoskori));
        calculateTotal('test');
    }
} 


function calculateTotal(productIDs_str) {

    var totalsum = 0;
     if (localStorage.getItem('CART')) {
        var ostoskori = JSON.parse(localStorage.getItem('CART'));
        console.log(ostoskori);
        for (var i = 0; i < ostoskori.length; i++) {
            if (ostoskori[i].cardinfo == null) {
            } else {
                for(var a = 0;a<ostoskori[i].cardinfo.length;a++) {
                    totalsum = totalsum + parseFloat(ostoskori[i].cardinfo[a].value);
                }
            }
        }
    }
    var element = document.getElementById('totalsum');
    element.innerHTML = "" + totalsum.toFixed(2);
    
    /*
    var kaikki_yht = 0.00;
    var acc_yht = 0.00;

    const line_total_elem = document.getElementsByClassName('js-tilausrivi');
    if (line_total_elem.length > 0) {
        for (var i = 0; i < line_total_elem.length; i++) {
            kaikki_yht += parseFloat(line_total_elem[i].querySelector('.js-total').getAttribute('data-total-all'));
        }
    }

    const line_total_acc_elem = document.getElementsByClassName('js-accessory-row');
    if (line_total_acc_elem.length > 0) {
        for (var i = 0; i < line_total_acc_elem.length; i++) {
            acc_yht += parseFloat(line_total_acc_elem[i].querySelector('.js-acc-total').getAttribute('data-total-all'));
        }
    }
    
    var subt_total = kaikki_yht + acc_yht;
    
    // Välisumma
    if (document.getElementById('orderTotalSumBoxJS')) {
        document.getElementById('orderTotalSumBoxJS').querySelector('.js-total-with-vat').innerHTML = subt_total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',');
        document.getElementById('orderTotalSumBoxJS').querySelector('.js-total-with-vat').setAttribute('data-total-with-vat', subt_total);
    }
    
    // Haetaan toimituskulut
    const data = {
        orderSum: subt_total,
        productIDs: productIDs_str
    };
  
    const params = encodeQueryData(data);
    const callbackArgs = [subt_total];
    const responseType = 'html';
    httRequestHanlder('get', 'ajax/get-delivery-fee-sum/', params, responseType, calculateDeliveryMethod, callbackArgs);
    
    */
}

function calculateDeliveryMethod(sub_total, requestResponse) {
    console.log(requestResponse);
    if (requestResponse) {
        var delivery_sum = parseFloat(requestResponse);
        var total = sub_total + delivery_sum;
        
        // Toimituskulut
        if (document.getElementById('orderTotalSumBoxJS')) {
            document.getElementById('orderTotalSumBoxJS').querySelector('.js-delivery-sum').innerHTML = delivery_sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',');
            document.getElementById('orderTotalSumBoxJS').querySelector('.js-delivery-sum').setAttribute('data-delivery-sum', delivery_sum);

            // Yhteensä
            document.getElementById('orderTotalSumBoxJS').querySelector('.js-total-all').innerHTML = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',');
            document.getElementById('orderTotalSumBoxJS').querySelector('.js-total-all').setAttribute('data-total-all', total);
        }

    } else {
        alert('Tapahtui virhe. Päivitä sivu yrittääksesi uudelleen.');
    }
}

/** CART FUNCTIONS END **/
/** GENERAL ECOMMERCE FUNCTIONS START **/

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

var xmlHttp = null;
function httRequestHanlder(method, url, params, responseType, callbackFunction, callbackArgs, multipleRequestAllowed) {
    if (method == 'post') {
    var paramsSend = params;
    var paramsGet = '';
    } else {
    var paramsSend = null;
    var paramsGet = '?' + params;
    }

    if (multipleRequestAllowed == true) {
        var xmlHttp = null;
    }

    if (xmlHttp != null) {
        xmlHttp.abort();
    } else {
        if (document.getElementById('ajax-loader').style.display == 'none') {
            var loader = setTimeout(startLoader, 2000);
        }
    }

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            stopLoader(loader);
            var response = xmlHttp.responseText;
            if (xmlHttp.responseText !== '') {
                if (responseType === 'json') {
                    response = JSON.parse(xmlHttp.responseText);
                }
            }

            if (callbackFunction) {
                callbackFunction(...callbackArgs, response);
            }
        }
    }
    xmlHttp.open(method, url + paramsGet);
    xmlHttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlHttp.send(paramsSend);
}

function httRequestHanlderDebug(method, url, params, responseType, callbackFunction, callbackArgs, multipleRequestAllowed) {
    
    console.log(url);
    
    if (method == 'post') {
    var paramsSend = params;
    var paramsGet = '';
    } else {
    var paramsSend = null;
    var paramsGet = '?' + params;
    }

    if (multipleRequestAllowed == true) {
        var xmlHttp = null;
    }

    if (xmlHttp != null) {
        xmlHttp.abort();
    } else {
        if (document.getElementById('ajax-loader').style.display == 'none') {
            var loader = setTimeout(startLoader, 2000);
        }
    }

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            stopLoader(loader);
            var response = xmlHttp.responseText;
            if (xmlHttp.responseText !== '') {
                if (responseType === 'json') {
                    response = JSON.parse(xmlHttp.responseText);
                }
            }

            if (callbackFunction) {
                //console.log(response);
                //console.log(callbackArgs);
                //console.log('callbackfunctioni - '+callbackFunction);
                callbackFunction(...callbackArgs, response);
            }
        }
    }
    xmlHttp.open(method, url + paramsGet);
    xmlHttp.setRequestHeader('Cache-Control', 'no-cache');
    xmlHttp.send(paramsSend);
}


function showAjaxContent(elementDOMID, innerHTMLData) {
    if (elementDOMID) {
      document.getElementById(elementDOMID).innerHTML = innerHTMLData;
    }
}

function showShopMessage(message, message_class, delay) {
    delay = (delay > 0) ? delay : 2000;
    var messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = message;
    messageBox.classList.remove('fadeout');
    messageBox.classList.add(message_class);
    messageBox.classList.add('fade');

    setTimeout(function () {
      messageBox.classList.remove('fade');
      messageBox.classList.add('fadeout');
    }, delay);
}

function startLoader() {
    document.getElementById('ajax-loader').innerHTML = '<img src="ikonit/loader-200.gif">';
    document.getElementById('ajax-loader').style.display = 'block';
}

function stopLoader(interval) {
    document.getElementById('ajax-loader').innerHTML = '';
    document.getElementById('ajax-loader').style.display = 'none';
    clearTimeout(interval);
}

function display_and_hide(displayID, hideID) {
    if (displayID !== '') {
        document.getElementById(displayID).style.display = 'block';
        // Jos input kenttiä, disabloidaan
        var form_inputs = document.getElementById(displayID).querySelectorAll('input');
        for (var i = 0; i < form_inputs.length; i++) {
            form_inputs[i].disabled = false;
        }
    }
    if (hideID !== '') {
        document.getElementById(hideID).style.display = 'none';    
        // Jos input kenttiä, disabloidaan
        var form_inputs = document.getElementById(hideID).querySelectorAll('input');
        for (var i = 0; i < form_inputs.length; i++) {
            form_inputs[i].disabled = true;
        }
    }
}

function display_and_hide_checked(elem, elemID) {
    if(elem.checked === true) {
        display_and_hide(elemID ,'');
    } else {
        display_and_hide('' ,elemID);
    }
}

function showDeliveryTerms(lang) {
    $.get(lang+'/content/tilaus-ja-toimitusehdot', function (data) {
      if (data !== '') {
          // Sivun template joka halutaan
          //var modal_content = $(data).find('#sec-374'); // <-- Nyt kiinteästi tämä..
          var modal_content =  $($.parseHTML(data)).filter(".section89");
          var modal = $('#payment-terms-modal');
          modal.find('.modal-body').html(modal_content);
          modal.modal('show');
      }
    });
}

function selectMK(button) {
    // valittu maksutapa
    var bank_buttons = document.querySelectorAll('.bank-button-img-wrapper'); 
    if (bank_buttons.length > 0) {
        for (var i = 0; i < bank_buttons.length; i++) {
            if(bank_buttons[i].classList.contains('active')) {
                bank_buttons[i].classList.remove('active');
            }
        }
    }
    document.getElementById(button).classList.add('active');
}

function acceptTerms(input, accept) {
    if (accept == 'true') {
        input.checked = true;
    }
    if (input.checked == true) {
        document.getElementById('maksutavat').style.display = 'block';
    } else {
        document.getElementById('maksutavat').style.display = 'none';
    }
}

function productQuantity(direction,productid,stockqty, animation, packetqty) {

    var qty = document.getElementById("productQty"+productid).value;
    var qtyint = parseInt(qty);
    var stockqtyint = parseInt(stockqty);
    var packetqtyint = parseInt(packetqty);
    var newqty;
    var originalqty = parseInt(qty);
    
    if (isNaN(qtyint)) {
        var qtyint = packetqtyint;
    }
    
    // Tarkistetaan onko annettu arvo myyntierän mukainen
    var quotient = Math.floor(qtyint/packetqtyint);
    var remainder = qtyint % packetqtyint;
      
      // Arvo on vähintään yhden myyntierän JA jakojäännös on 0
    if (quotient > 0 && remainder === 0) {
  
    } else {
      // Arvo on vähemmän kuin yhden myyntierän
      if (quotient < 1 ) {
            qtyint=packetqtyint;
      } else {
      
        var sales_value_more = Math.ceil(quotient*packetqtyint);
        sales_value_more = sales_value_more + packetqtyint;
        var sales_value_more_remainer = sales_value_more;
        sales_value_more_remainer = sales_value_more_remainer - qtyint;
      
        // Jakojäännös
        if (remainder < sales_value_more_remainer) {
          // Jakojäännös yli tai yhtäsuuri ku puolet, pyöristetään ylös seuraavaan myyntierään
          qtyint=qtyint - remainder;
        
        } else {
          // Jakojäännös on 3 tai 4, pyöristetään ylös seuraavaan myyntierään
          qtyint=qtyint + (packetqtyint - remainder);
          // Arvo on isompi kuin stock arvo
          if (qtyint > stockqtyint) {
            if (direction == 'down') {
                qtyint=qtyint;
            } else {
                qtyint=stockqtyint;
            }
          }
        }
      }
    }
    
    if (direction == 'up') {
        var triedqtyint=qtyint + packetqtyint;
        newqty=qtyint + packetqtyint;
    } else {
        var triedqtyint=qtyint - packetqtyint;   
        if (direction == 'down') {
            newqty=qtyint - packetqtyint;
        } else {
            newqty=qtyint;
            triedqtyint=originalqty;
        }
    }
    
    // Jos yritetään pienempää määrää kuin edes 1 erä
    if (triedqtyint <= packetqtyint) {
        newqty=packetqtyint;
    }
    
    if (triedqtyint > stockqtyint) {
        // $('#stock-over-info-txt'+productid).css('display','block');
        showShopMessage(''+no_more_products_are_available+'', 'product_removed', 2000);
    newqty=stockqtyint;
    } else {
        // $('#stock-over-info-txt'+productid).css('display','none');
    }
    
    
    // Ei painettu pitkään pohjassa..
    if (animation == 'false') {
        remainder = originalqty % packetqtyint;
        if (stockqtyint == newqty+remainder) {
          remainder=0;
        }

      if (remainder > 0) {
        if (newqty != stockqtyint) {
          // $('#recommended_packet_qty_txt'+productid).css('display','block');
        }
      } else {
        // $('#recommended_packet_qty_txt'+productid).css('display','none');
      }
      // $('#productQty'+productid).val(newqty);
      document.getElementById("productQty"+productid).value = newqty;
    } else {
      
        if (qtyint > stockqtyint) {
        qtyint=qtyint - packetqtyint;
        }
      
        // Painettiin pitkään, aletaan rullaamaan numeroita
        setTimeout(function() {
        numberValue(newqty, productid, qtyint, stockqtyint, direction, packetqtyint);
        }, 300);

      }
}

var clr = null;
function numberValue (newqty, productid, triedqtyint, stockqtyint, direction, packetqtyint) {
    clearTimeout(clr);
    (inloop = function() {
      if (triedqtyint <= stockqtyint && triedqtyint > packetqtyint) {
        if (direction == 'up') {
          if (triedqtyint+packetqtyint < stockqtyint) {
          // $('#productQty'+productid).val(triedqtyint+=packetqtyint);
          document.getElementById("productQty"+productid).value = triedqtyint+=packetqtyint;
          } else {
                // $('#productQty'+productid).val(stockqtyint);
                // $('#stock-over-info-txt'+productid).css('display','block');
                document.getElementById("productQty"+productid).value = stockqtyint;
                showShopMessage(''+no_more_products_are_available+'', 'product_removed', 2000);
          }
        }
        if (direction == 'down') {
          if (triedqtyint > packetqtyint) {
          // $('#productQty'+productid).val(triedqtyint-=packetqtyint);
          document.getElementById("productQty"+productid).value = triedqtyint-=packetqtyint;
          }
        }
        
        clr = setTimeout(inloop, 200);
      
      } else {
        clearTimeout(clr);
        clearTimeout(numberValue);
        return false;
      }
    })(); 
}

/** mouse down / up **/
var isDown = false,
isLong = false,
target,            // which element was clicked
longTID;

function handleMouseDown() {
  //this.innerHTML = "Mouse down...";
  isDown = true;                                    // button status (any button here)
  isLong = false;                                   // longpress status reset
  target = this;                                    // store this as target element
  clearTimeout(longTID);                            // clear any running timers
  longTID = setTimeout(longPress.bind(this), 500); // create a new timer for this click
}

function handleMouseUp(e) {
    if (isDown && isLong) {                           // if a long press, cancel
    isDown = false;                                 // clear in any case
    e.preventDefault();                             // and ignore this event
    clearTimeout(clr);
    clearTimeout(numberValue);
    return;
    }

    if (isDown) {                                    // if we came from down status:
        clearTimeout(longTID);                        // clear timer to avoid false longpress
        isDown = false;
        //target.innerHTML = "Normal up";               // for clicked element
        
        var direction = target.getAttribute("data-direction");
        var productid = target.getAttribute("data-productid");
        var stockqty = target.getAttribute("data-stockqty");
        var packetqty = target.getAttribute("data-packetqty");
        
        productQuantity(direction, productid, stockqty, 'false', packetqty);

        target = null;
    }
    // tarkistetaan onko ostoskori auki ja osuiko klikkaus siihen (jos ei niin suljetaan se)
    var shopping_cart = document.getElementById('tinyShoppingCartItemsJS');
    if (!shopping_cart.contains(e.target)) {
        shopping_cart.style.display = 'none';
    }
}

function longPress() {
  isLong = true;
  //this.innerHTML = "Long press";
  // throw custom event or call code for long press
  var direction = target.getAttribute("data-direction");
  var productid = target.getAttribute("data-productid");
  var stockqty = target.getAttribute("data-stockqty");
  var packetqty = target.getAttribute("data-packetqty");

  productQuantity(direction, productid, stockqty, 'true', packetqty);
}

function getProductList(categoryID, lang) {
    
    var sp_param = '';
    if (document.getElementById('show-only-shop-products-checkbox')) {
        if (document.getElementById('show-only-shop-products-checkbox').checked == true) {
            var sp_param = document.getElementById('show-only-shop-products-checkbox').value;
        }
    }
    
    var sortBy = document.getElementById('sort-products').value;
    var search_keyword = document.getElementById('search-products').value;

    // Haetaan kun hakusana on tyhjä TAI vähintään 3 kirjainta
    if (search_keyword.length == 0 || search_keyword.length >= 3) {
    
        // Haetaan toimituskulut
        const data = {
            categoryID: categoryID,
            sort_by: sortBy,
            lang: lang,
            shop_product: sp_param,
            search_keyword: search_keyword
        };
    
        const params = encodeQueryData(data);
        const callbackArgs = [];
        const responseType = 'html';
        httRequestHanlder('get', 'ajax/get-product-list/', params, responseType, showProductList, callbackArgs);
    }
}

function showProductList(requestResponse) {
    if (requestResponse !== '') {
        var scroll = document.documentElement.scrollTop;
        window.document.getElementById('js-product-list-container').innerHTML=requestResponse;
        window.scrollTo(0, scroll);
    } else {
        alert('An error has occured while loading products. Please refresh page.');
    }
}

function addGiftCardValue(elem) {
    elem.parentElement.setAttribute('data-price', '');
    if (!isNaN(elem.value) && elem.value !== '') {
        elem.parentElement.setAttribute('data-price', parseInt(elem.value));
    }
}

/** GENERAL ECOMMERCE FUNCTIONS END **/
/** ENHANCED ECOMMERCE START **/
function ecommerceChecoutStep(step, redirect, option) {

    //var sessionelement = document.getElementById('shoppingcart-sessionID');
    var sessionID = 'CART';
    console.log('sessionID - '+sessionID);
    var session_ok = checkSession(sessionID);
    if (session_ok) {

        console.log('nextit - ' + step);
        
        if (step == 1) {
            var ostoskori_object = localStorage.getItem(sessionID);
            var ostoskori = JSON.parse(ostoskori_object);

            // Viedään tuotteet vain step 1
            console.log('ostoskori..');
            console.log(ostoskori);
            
            if (ostoskori && ostoskori.length > 0) {
               console.log('ostoskori length ' + ostoskori.length);
                
                for (var i = 0; i < ostoskori.length; i++) {
                    console.log(' ostoskori - productID - '+ostoskori[i].productID);
                    
                    if (ostoskori[i].cardinfo != null) {
                        console.log(' ostoskori - cardinfo length - '+ostoskori[i].cardinfo.length);
                        for(var ci = 0;ci< ostoskori[i].cardinfo.length;ci++) {
                            var inputElementID = 'summa-' + ostoskori[i].productID + '-' + (ci+1);
                            var element = document.getElementById(inputElementID);
                            if (element == null) {
                                console.log(' - summa element null - '+inputElementID);
                            } else {
                                var value = element.value;
                                console.log(' - summa value found - '+value+' ('+inputElementID+')');
                                if (value == '') {
                                    ostoskori[i].cardinfo[ci].value = 0;
                                } else {
                                    ostoskori[i].cardinfo[ci].value = parseInt(value);
                                }
                            }
                            
                            inputElementID = 'saaja-' + ostoskori[i].productID + '-' + (ci+1);
                            element = document.getElementById(inputElementID);
                            if (element == null) {
                                console.log(' - saaja element null - '+inputElementID);
                            } else {
                                var value = element.value;
                                console.log(' - saaja value found - '+value);
                                if (value == '') {
                                    ostoskori[i].cardinfo[ci].name = '';
                                } else {
                                    ostoskori[i].cardinfo[ci].name = value;
                                }
                            }
                            
                            inputElementID = 'saajaemail-' + ostoskori[i].productID + '-'  + (ci+1);
                            element = document.getElementById(inputElementID);
                            if (element == null) {
                                console.log(' - saajaemail element null - '+inputElementID);
                            } else {
                                var value = element.value;
                                console.log(' - saajaemail value found - '+value);
                                if (value == '') {
                                    ostoskori[i].cardinfo[ci].email = '';
                                } else {
                                    ostoskori[i].cardinfo[ci].email = value;
                                }
                            }
                            
                            
                            inputElementID = 'cardmessage-' + ostoskori[i].productID + '-'  + (ci+1);
                            element = document.getElementById(inputElementID);
                            if (element == null) {
                                console.log(' - cardmessage element null - '+inputElementID);
                            } else {
                                var value = element.value;
                                console.log(' - cardmessage value found - '+value);
                                if (value == '') {
                                    ostoskori[i].cardinfo[ci].message = '';
                                } else {
                                    ostoskori[i].cardinfo[ci].message = value;
                                }
                            }
                            
                            
                            
                            inputElementID = 'cardchedule-' + ostoskori[i].productID + '-'  + (ci+1);
                            console.log('inputElementID- '+inputElementID);
                            element = document.getElementById(inputElementID);
                            if (element != null) {
                                if (element.checked == true) {
                                    console.log(' - ajasetttu 1 - '+inputElementID);
                                    ostoskori[i].cardinfo[ci].ajastettu = 1;

                                } else {
                                    console.log(' - ajasetttu 0 - '+inputElementID);
                                    ostoskori[i].cardinfo[ci].ajastettu = 0;
                                }                                
                            } else {
                                console.log(' - chedule element null - '+inputElementID);
                            }
                            

                            inputElementID = 'deliverydate-' + ostoskori[i].productID + '-'  + (ci+1);
                            element = document.getElementById(inputElementID);
                            if (element == null) {
                                console.log(' - cardmessage element null - '+inputElementID);
                            } else {
                                var value = element.value;
                                console.log(' - cardmessage value found - '+value);
                                if (value == '') {
                                    ostoskori[i].cardinfo[ci].send_date = '';
                                } else {
                                    ostoskori[i].cardinfo[ci].send_date = value;
                                }
                            }
                            
                            
                            inputElementID = 'deliverytime-' + ostoskori[i].productID + '-'  + (ci+1);
                            element = document.getElementById(inputElementID);
                            if (element == null) {
                                console.log(' - cardmessage element null - '+inputElementID);
                            } else {
                                var value = element.value;
                                console.log(' - cardmessage value found - '+value);
                                if (value == '') {
                                    ostoskori[i].cardinfo[ci].send_time = '';
                                } else {
                                    ostoskori[i].cardinfo[ci].send_time = value;
                                }
                            }

                        }
                    }
                }
                console.log(ostoskori);
                localStorage.setItem(sessionID, JSON.stringify(ostoskori));
                document.location = redirect;
            }
            
        }
        //console.log('endi');
        
        
        if (step == 2) {
            document.location = redirect;
        }
        
        //document.location = redirect; // TÄMÄ pois JOS ee otetaan käyttöön
        
        /*
        // Ekalla stepillä tuotteet mukaan
        if (step == 1) {
            var ostoskori_object = localStorage.getItem(sessionID);
            var ostoskori = JSON.parse(ostoskori_object);

            // Viedään tuotteet vain step 1

            if (ostoskori && ostoskori.length > 0) {
                var ecommerce_products_arr = [];
                for (var i = 0; i < ostoskori.length; i++) {

                    // Mahdolliset accessory tuotteet
                    var dimension = '';
                    var acc_row = document.querySelectorAll("[data-parentid='"+ostoskori[i].rowID+"']");
                    if (acc_row) {
                        for (var k = 0; k < acc_row.length; k++) {

                            var acc_name_elem = acc_row[k].querySelector(".js-header");
                            if (dimension === '') {
                                dimension = acc_name_elem.innerHTML.trim();
                            } else {
                                dimension += ' | '+acc_name_elem.innerHTML.trim();
                            }
                        }
                    }

                    ecommerce_products_arr.push({
                        id: ostoskori[i].tuoteID,
                        name: ostoskori[i].product_name,
                        price: ostoskori[i].product_price,
                        brand: companyName,
                        category: ostoskori[i].category_name,
                        variant: ostoskori[i].tunniste,
                        quantity: parseInt(ostoskori[i].lukumaara),
                        dimension1: dimension
                    });
                }
            }

            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            dataLayer.push({

                event: 'checkout',
                ecommerce: {
                    'currencyCode': 'EUR',
                    checkout: {
                            actionField: {
                            step: step, //name of the list from which a user clicked on a product
                            option: option
                            },
                            products: ecommerce_products_arr
                        }
                }, 'eventCallback': function() {
                        document.location = redirect;
                    }
            });

        } else {
            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            dataLayer.push({

                event: 'checkout',
                ecommerce: {
                    checkout: {
                            actionField: {
                            step: step, //name of the list from which a user clicked on a product
                            option: option
                            }
                        }
                }, 'eventCallback': function() {
                        document.location = redirect;
                    }
            });
        } 
        */
    } else {
        location.reload();
    }
}

function removeEmojisFromInputElement(elementid){
    var element = document.getElementById(elementid);
    if(element != undefined && element.value != undefined){
        element.value = removeEmojis(element.value);
    }
}

function removeEmojis(text){
    return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
}

/*
function eeCommerceAddCart(id, quantity, referrer_page, rowID) {
    
    if (referrer_page == 'tuote') {
        
        var tunniste = '';
        var list_from = '';
        
        var list_from_elem = document.getElementsByName("ecommerce_list_from");
        if (list_from_elem) {
            list_from = list_from_elem[0].value;
        }
        var product_name_elem = document.getElementsByName("ecommerce_product_name");
        var product_name = product_name_elem[0].value;
        var category_name_elem = document.getElementsByName("ecommerce_category_name");
        var category_name = category_name_elem[0].value;
        var product_price_elem = document.getElementsByClassName("js-product-price");
        var product_price = product_price_elem[0].getAttribute("data-price");
        
        // Tunniste
        var tunniste_elem = document.querySelectorAll('.single-colour.active');
        if (tunniste_elem.length > 0) {
            tunniste = tunniste_elem[0].getAttribute("data-tunniste");
        }
        
        // valitut accessoryt
        var dimension = '';
        var accessories_elem = document.querySelectorAll('.acc-toggle.selected');
        for (var i=0; i < accessories_elem.length; i++) {
            if (dimension === '') {
                dimension = accessories_elem[i].innerHTML.trim();
            } else {
                dimension += ' | '+accessories_elem[i].innerHTML.trim();
            }
        }
    }

    if (referrer_page == 'ostoskori') {
        
        var list_from = 'ostoskori';
        var cart_row = document.querySelector("[data-rowid='"+rowID+"']");
        
        var product_name_elem = cart_row.querySelector(".js-header");
        var product_name = product_name_elem.innerHTML;
        
        var product_input_elem = cart_row.querySelector(".js-quantity-per-product");
        var category_name = product_input_elem.getAttribute("data-product-category");
        var tunniste = product_input_elem.getAttribute("data-tunniste");
        
        var product_price_elem = cart_row.querySelector(".js-kokonaishinta");
        var product_price = parseFloat(product_price_elem.getAttribute("data-kokonaishinta-aprice"));
        
        // Mahdolliset accessory tuotteet
        var dimension = '';
        var acc_row = document.querySelectorAll("[data-parentid='"+rowID+"']");
        if (acc_row) {
            for (var i = 0; i < acc_row.length; i++) {
                
                var acc_name_elem = acc_row[i].querySelector(".js-header");
                if (dimension === '') {
                    dimension = acc_name_elem.innerHTML.trim();
                } else {
                    dimension += ' | '+acc_name_elem.innerHTML.trim();
                }
            }
        }
    }

    if (product_name && category_name && product_price) {
    
        dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        dataLayer.push({

            event: 'addToCart',
            ecommerce: {
                currencyCode: 'EUR',
                add: {
                      actionField: {
                        list: list_from //name of the list from which a user clicked on a product
                      },
                      products: [{ //a product on which a user clicked
                        id: id, //an article of the product on which a user clicked
                        name: product_name,
                        price: product_price,
                        brand: companyName, 
                        category: category_name,
                        variant: tunniste,
                        dimension1: dimension,
                        quantity: quantity
                      }]
                    }
            }
        });
    }
} */

/*
function eeCommerceRemoveCart(id, quantity, referrer_page, rowID) {

    if (referrer_page == 'ostoskori') {
        var list_from = 'ostoskori';
        var cart_row = document.querySelector("[data-rowid='"+rowID+"']");
        
        var product_name_elem = cart_row.querySelector(".js-header");
        var product_name = product_name_elem.innerHTML;
        
        var product_input_elem = cart_row.querySelector(".js-quantity-per-product");
        var category_name = product_input_elem.getAttribute("data-product-category");
        var tunniste = product_input_elem.getAttribute("data-tunniste");
        
        var product_price_elem = cart_row.querySelector(".js-kokonaishinta");
        var product_price = parseFloat(product_price_elem.getAttribute("data-kokonaishinta-aprice"));
        
        // Mahdolliset accessory tuotteet
        var dimension = '';
        var acc_row = document.querySelectorAll("[data-parentid='"+rowID+"']");
        if (acc_row) {
            for (var i = 0; i < acc_row.length; i++) {
                
                var acc_name_elem = acc_row[i].querySelector(".js-header");
                if (dimension === '') {
                    dimension = acc_name_elem.innerHTML.trim();
                } else {
                    dimension += ' | '+acc_name_elem.innerHTML.trim();
                }
            }
        }
        
    }

    if (product_name && category_name && product_price) {
    
        dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        dataLayer.push({

            event: 'removeFromCart',
            ecommerce: {
                'currencyCode': 'EUR',
                remove: {
                      actionField: {
                        list: list_from //name of the list from which a user clicked on a product
                      },
                      products: [{ //a product on which a user clicked
                        id: id, //an article of the product on which a user clicked
                        name: product_name,
                        price: product_price,
                        brand: companyName, 
                        category: category_name,
                        variant: tunniste,
                        dimension1: dimension,
                        quantity: quantity
                      }]
                    }
            }
        });
    }
}
*/

/** ENHANCED ECOMMERCE END **/



/** BRANDEMAIL STARTS **/
// Subscribes newsletter 
// tags parameter = array of strings
/*
function subscribeNewsletter(Site_ID, newslettergroupCode, email, name = "", address = "", city = "", ReceiverList_ID = 0, tags = []){
    var ttt;

    if(tags.length > 0){
        var y = new Date().getFullYear();
        ttt = new Array(tags.length);
        tags.forEach((tagName) => {
            t = {Name : tagName, Value : y};
            ttt.push(t);
        });
      }

    var data = JSON.stringify({
        "Identifier": newslettergroupCode,
        "Email": email,      
        "Site_ID": Site_ID,   
        "Tags": ttt
    });

      if(name != ""){
        data.Name = name;
      }

      if(address != ""){
        data.Address = address;
      }

      if(city != ""){
        data.City = city;
      }
      
      if(ReceiverList_ID > 0){
        data.ReceiverList_ID = ReceiverList_ID;
      }

     

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "https://api.brandev.fi/api/NewsLetters/SubscribeV2");
      xhr.setRequestHeader("Content-Type", "application/json");
      
      xhr.send(data);
}
*/
/** BRANDEMAIL END **/