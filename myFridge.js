if (Meteor.isClient) {
  Template.productList.helpers({
    product: function(){
      return Product.find({
        place: 'supermarket'
      });
    }
  });

  Template.fridge.helpers({
    product: function(){
      return Product.find({
        place: 'fridge'
      });
    }
  })

  Template.layout.rendered = function(){

    $('#fridge').droppable({
      drop: function(evt, ui){
        var query = { _id: $(ui.draggable).data('id') };
        var data = { $set: { place: 'fridge' } };
        Product.update( query, data );
      }
    });

    $('#supermarket').droppable({
      drop: function(evt, ui){
        var query = { _id: $(ui.draggable).data('id') };
        var data = { $set: { place: 'supermarket'} };
        Product.update( query, data );
      }
    })
  };

  Template.productListItem.rendered = function(){
    $(this.find('.draggable')).draggable({
      cursor: 'move',
      helper: 'clone',
      start: function(){
        var query = { _id: $(this).data('id') };
        var data = { $set: { isDragging: true }};
        Product.update( query, data );
      },
      stop: function(){
        var query = { _id: $(this).data('id') };
        var data = { $set: { isDragging: false }};
        Product.update(query, data);
      }
    });
  }


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    if(Product.find().count() > 0){
      return;
    }

    // clear the data base if the server starts
    Product.remove({});

    // fill the database with some products
    Product.insert({
      name: 'Banana',
      img: '/banana.png',
      place: 'supermarket',
      isDragging: false
    });

    Product.insert({
      name: 'Milk',
      img: '/milk.png',
      place: 'supermarket',
      isDragging: false
    });

    Product.insert({
      name: 'Bread',
      img: '/bread.png',
      place: 'supermarket',
      isDragging: false
    });

    Product.insert({
      name: 'Juice',
      img: '/juice.png',
      place: 'supermarket',
      isDragging: false
    });
  });
}


Product = new Meteor.Collection('products');
