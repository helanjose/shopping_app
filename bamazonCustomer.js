var mysql = require("mysql");
var inquirer = require("inquirer");
const {printTable} = require('console-table-printer');

var cart_item_arr=[''];
var cart_itemID_arr=[''];
var cart_itemPrice_arr=[''];
var cart_item_quantity_arr=[''];
var item_quantity;



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
      printTable(res);
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
          //console.log("id&q"+product_id+"\n"+item_quantity);
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
  //printTable(db_stock);


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
    var cart_item_quantity
    cart_item_arr.push(cart_item_name);
    cart_itemID_arr.push(cart_item_id);
    cart_itemPrice_arr.push(cart_item_price);
    cart_item_quantity_arr.push(item_quantity);
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
var sum=0;
sales_product=0;

 //console.log(total_price);
 //console.log(typeof(total_price))
var i,j,k;
for (i=0,j=0,k=0;i<cart_item_arr.length,j<cart_itemPrice_arr.length,k<cart_item_quantity_arr.length;i++,j++,k++)
{

  

  if((cart_item_arr[i]!='')&&(cart_itemPrice_arr[j]!=='')&&(cart_item_quantity_arr!==''))
  {

  
  console.log("[*]\t item:"+cart_item_arr[i]);
  console.log("[*]\t price:"+cart_itemPrice_arr[j]);
  console.log("[*]\t Quantity:"+cart_item_quantity_arr[k]+"\n");
  }
}
for(i=0,j=0;i<cart_itemPrice_arr.length,j<cart_item_quantity_arr.length;i++,j++)
{
  if((cart_itemPrice_arr[i]!=='')&&(cart_item_quantity_arr!==''))
  {
 sum+=parseInt(cart_itemPrice_arr[i]*cart_item_quantity_arr[j]);
 //sales_product+=sum;
  }
 
}
 
 console.log("Cart Total:"+sum);
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
          connection.query("update products t inner join products s on s.item_id=t.item_id set  t.product_sales= s.product_sales+ ? where s.item_id=?;",[sum,product_id],
          function(err,res)
          {
            if(err)
            {
              throw err;
          }
          //console.log("\n-----------------------------");
        }
          );
         
          console.log("Successfully placed order!!!\n"+"Order Total:"+sum);
          console.log("\n-----------------------------");

          
          update_stock(db_stock);
         } 
         else if(res1.confirms=='No')
         {
           console.log("Thanks for visiting !!");
           connection.end();
          
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
connection.end();
}
);
}



