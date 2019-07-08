var mysql=require("mysql");
var inquirer = require("inquirer");
const {printTable} = require('console-table-printer');
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
     
    });
  

//menu options for manager
function menu()
{

inquirer.prompt({
    name:'menu',
    type:"list",
    choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product','exit'],
    message:"MENU\n ==================\n"
}).then(function(choice)
{
    console.log(choice.menu);
    var op=choice.menu;
  switch(op)
  {
      case 'View Products for Sale' :
                 products_for_sale();
                 break;
      case 'View Low Inventory' :
                 low_inventory();
                 break;
      case 'Add to Inventory' :
                 add_inventory();
                 break;
      case 'Add New Product' :
                  add_product()
                 break;
      case 'exit':
                 connection.end();
                 break;
  }
}
);
}
menu();

function products_for_sale(){
    connection.query("select * from products",function(err,data)
    
    {
        if(err)
        {
            throw err;

        }
        //console.table(data);
        console.log("PRODUCTS FOR SALE\n");
        printTable(data);
        console.log("\n");
        menu();
        
    }
    
    );
   
    //connection.end();
}
function  low_inventory(){
    connection.query("select * from products where stock_quantity < 5",function(err,data)
    {
        if(err)
        {
            throw err;
        }
        printTable(data);
        console.log("\n");
        menu();
    });
    
   
}
function add_product()
{
    inquirer.prompt(
        [{
         name:'item',
         type:'input',
         message:'Enter  New item Name'   
        },
        {
            name:'department',
            type:'input',
            message:'Enter  Department Name' 
        },
        {
            name:'price',
            type:'input',
            message:'Enter Price' 

        },
        {
            name:'quantity',
            type:'input',
            message:'Enter stock quantity' 

        }
       ]).then(function(res)
       {
           var new_poduct=res.item;
           var dpt=res.department;
           var amount=res.price;
           var qty=res.quantity;
       
      

       connection.query("insert into products set?",
       {
        product_name:new_poduct,
        department_name:dpt,
        price:amount,
        stock_quantity:qty
       },
       function(err,data)
       {
           if(err)
           {
               throw err;
           }
           //inorder to call menu after stock updation
          var count=0;
          count+=1;
           console.log(data.affectedRows + " product inserted!\n");
           if(count==1)
           {
            menu();
            }
       }
       
       );
       }
       );
      // connection.end();
   
}

function  add_inventory()
{
    inquirer.prompt([{
        type:'input',
        name:'id',
        message:"enter item id to update stock quantity:"

    },
    {
        type:'input',
        name:'qty',
        message:'enter new stock quantity:' 
    }]
    ).then(function(data)
    {
      var p_id=data.id;
      var old_stock_q;
      var quantity;
      quantity=data.qty;
      //console.log(p_id+"/"+quantity);
      //stock updation will add new stock and existing stock of a particular product
      connection.query("select stock_quantity from products where ?",
      {item_id:p_id},function(err,data)
      {
          if(err)
          {
              throw err;
          }
          var old_stock=JSON.parse(JSON.stringify(data));
          old_stock_q=old_stock[0].stock_quantity;
          //console.log("old stock:"+typeof(old_stock_q));
          //console.log("quantity:"+typeof(quantity));
          quantity=parseInt(quantity)
         quantity +=old_stock_q;
         update_stock(p_id,quantity);
          //console.log("llnew stock:"+quantity);
      });
      
       
      
     
    }
    );
    
  
    
   // connection.end();
    
}

function update_stock(p,q)
{
    var p_id=p;
    var quantity=q;
    //console.log("new stock:"+quantity);
     
    connection.query("update products set? where ?",
    [
     {stock_quantity:quantity},
     {item_id:p_id}
    ]
    ,function(err,data)
      {
        if(err)
        {
            throw err;
        }
        //inorder to call menu after stock updation
        var count=0;
        count+=1;
        console.log(data.affectedRows+"stock updated");
       if(count==1)
           {
       menu();
            }
      }
      
      
      );
}