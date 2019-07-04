var mysql = require("mysql");
var inquirer = require("inquirer");
var cart_item_arr=[''];
var cart_itemID_arr=[''];
var cart_itemPrice_arr=0;



var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "helan123",
  database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    display_sales();
  });

  function display_sales() {
    connection.query("SELECT item_id,product_name,department_name ,price FROM products", function(err, res) {
      if (err) throw err;
      console.log("items for sale\n");
      console.log("*********************************");
      console.table(res);
      participate_sale();
    });
  }
  function participate_sale() {
    inquirer
      .prompt([
          
      {
        name: "ID",
        type: "input",
        message: "Enter ID of the product you would like to buy.",
       
      },
      {
        name: "quantity",
        type: "input",
        message:"Enter Quantity" 
      }
      
     ] )
    
    .then(function(answer) {

          product_id=answer.ID;
          item_quantity=answer.quantity;
          console.log("id&q"+product_id+"\n"+item_quantity);
         //checking item quantity in db
          stockcheck();
    
    });
}
function stockcheck()
{
connection.query("select stock_quantity from products where item_id=?",product_id,

function(err,res)
{
  if(err)
  {
    throw err;
  }
  //console.log(res);
 var stock_data=JSON.parse(JSON.stringify(res));
 //console.log(stock_data[0].stock_quantity);
  var db_stock=stock_data[0].stock_quantity;
 console.log(db_stock);


 if(item_quantity > db_stock)
 {
   console.log("Insufficient quantity!available stock:"+db_stock+"select other product! from todays hot sale");
   display_sales() ;
 }
else{
  console.log("item available!total stock"+db_stock);
  inquirer.prompt(
    {
      name:'confirm',
      type:'list',
      choices:['yes','No'],
      message:"DO YOU WANT TO ADD ITEM TO CART?"
    }
  ).then (function(res)
  {
    
 if(res.confirm=='yes')
{
  cart(product_id,db_stock);
  //update_stock(db_stock);
}
else if(res.confirm=='No')
{
  console.log("=============================");
  console.log("checkout todays hot deals!");
  console.log("=============================");
  display_sales();
}

  }
  );
 
}
}
);
}

function cart(id,stock)
{
  
  console.log("\n Successfully added to cart!\n");
  
  //creating a local variable product_id and receiving parameter value 
  var product_id=id;
  var db_stock=stock;
  connection.query("select * from products where item_id=?",product_id,
  function(err,res)
  {
    if(err)
    {
      throw err;
    }
    var cart_data=JSON.parse(JSON.stringify(res));
    var cart_item_id=cart_data[0].item_id;
    var cart_item_name=cart_data[0].product_name;
    var cart_item_price=cart_data[0].price;
    cart_item_arr.push(cart_item_name);
    cart_itemID_arr.push(cart_item_id);
    var cart_total=0;
    cart_total+=cart_item_price;

   
    
    console.log("Shopping Cart");
    //console.log("arr"+cart_item_arr+"id:"+cart_itemID_arr+"price:"+cart_itemPrice_arr);
    //console.log("-------------------------------");
    //console.log("product_name:"+cart_item_name+"\n"+
    //"Price:"+cart_item_price+"\n");
    shopping_decision( cart_total,db_stock);

  }
  
  );
}
function shopping_decision(p,qnty){
var total_price=p;
var db_stock=qnty;

 //console.log(total_price);
 //console.log(typeof(total_price))

 cart_item_arr.forEach(function(entry) {
  console.log("item:"+entry);
  console.log("price:");
});
 
 console.log("Cart Total:"+total_price);
 //console.log("here:"+ cart_item_arr);
  console.log("\n-------------------------------");
  inquirer.prompt(
    {
      name:"confirm",
      type:"list",
      choices:['Yes','No'],
      message:"Do you want to continue shopping?"
      

    }
  ).then(function(res)
  {
     if(res.confirm=='No')
     {
       console.log("\n-----------------------------");
       inquirer.prompt({
        name:"confirms",
        type:"list",
        choices:['Yes','No'],
        message:"Do you want to place order?"
        
       }).then(function(res1)
       {
      
         if(res1.confirms=='Yes')
         {

         
          console.log("Successfully placed order!!!\n"+"Order Total:"+total_price);
          update_stock(db_stock);
         } 
         else if(res1.confirms=='No')
         {
           console.log("noo");
         }
       });
     }
     else if(res.confirm=='Yes')
     {
       display_sales();
     }
    






  });

}









function update_stock(q){

var quantity=q;
//console.log("inside"+quantity);
quantity=quantity-item_quantity;
//console.log("now"+quantity);
connection.query("update products set stock_quantity=? where item_id=?",[quantity,product_id],
function(err,res)
{
  if(err)
  {
    throw err;
}
console.log("===========================");
console.log("stock updated successfully");
}
);
}



