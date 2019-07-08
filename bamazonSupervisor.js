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

    function menu()
{

inquirer.prompt({
    name:'menu',
    type:"list",
    choices:['View Product Sales by Department','Create New Department','exit'],
    message:"MENU\n ==================\n"
}).then(function(res){
    if(res.menu=='View Product Sales by Department')
    {
       // console.log('hhhhh');
       View_Product_Sales();
    }
   else if(res.menu=='Create New Department')
   {
    add_department();
   }
   else if(res.menu=='exit')
   {
       connection.end();
   }
});
}
menu();

function View_Product_Sales(){
    
    connection.query('select departments.department_id,departments.department_name,departments.over_head_costs,product_sales, product_sales-departments.over_head_costs as total_profit from departments  left outer join  (select sum(product_sales) as product_sales,department_name from  products group by   department_name) sales on sales.department_name=departments.department_name group by departments.department_id,departments.department_name,departments.over_head_costs',function(err,data){
       
        if(err)
        {
            throw err;
        }
        var count=0;
        count+=1;
        printTable(data);
        if(count==1)
           {
            menu();
            }
        
    });
    
    
}

function add_department()
{
    inquirer.prompt(
        [{
         name:'dept_id',
         type:'input',
         message:'Enter  New Department ID'   
        },
        {
            name:'department_name',
            type:'input',
            message:'Enter New Department Name' 
        },
        {
            name:'over_head_cost',
            type:'input',
            message:'Enter over_head_cost' 

        },
        
       ]).then(function(res)
       {
           var d_id=res.dept_id;
           var dpt=res.department_name;
           var amount=res.over_head_cost;
          
       
      

       connection.query("insert into departments set?",
       {
        department_id:d_id,
        department_name :dpt,
        over_head_costs:amount,
        
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
           console.log(data.affectedRows + " Department Created!\n");
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

