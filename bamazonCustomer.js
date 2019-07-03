var mysql = require("mysql");
var inquirer = require("inquirer");


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
    connection.query("SELECT item_id,product_name,price FROM products", function(err, res) {
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
      message:"Do you want to  continue?"
    }
  ).then (function(res)
  {
    
 if(res.confirm=='yes')
{
  update_stock(db_stock);
}

  }
  );
 
}
}
);
}

function update_stock(q){

var quantity=q;
console.log("inside"+quantity);
quantity=quantity-item_quantity;
console.log("now"+quantity);
connection.query("update products set stock_quantity=? where item_id=?",[quantity,product_id],
function(err,res)
{
  if(err)
  {
    throw err;
}
console.log("stock updated successfully");
}
);
}



