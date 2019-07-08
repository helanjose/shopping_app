# shopping_app Bamazon


## Description

This application implements a simple command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package. The application presents three interfaces: **customer** , **manager** and **supervisor**.
### Customer Interface

The customer interface allows the user to view the Products for sale which include: item IDs, Item Name, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock,User can add item to Cart and this application ask the user 'do you want to continue shopping?' user can either continue shopping or place the current order .the cart will show all items added in cart and total price .the user's order is fulfilled when user agree place order option.simultaniously stock after purchase is  updated in  the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:

	git clone https://github.com/helanjose/shopping_app.git
	cd shopping_app
	npm install
	node bamazonCustomer.js

 ### Manager Interace

The manager interface presents a list of four options, as below. 

	? Menu: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product
	  
The **View Products for Sale** option allows the user to view the current inventory of store items: item IDs, Item name, department in which the item is located, price, and the quantity available in stock. 

The **View Low Inventory** option shows the user the items which currently have fewer than 5 units available.

The **Add to Inventory** option allows the user to select a given item ID and add additional inventory to the target item.which will sum old stock and new stock.

The **Add New Product** option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

### Supervisor
 Running this application will list a set of menu options:

* * View Product Sales by Department
* * Create New Department



When a supervisor selects View Product Sales by Department, the app  display a summarized table which include department_id,department_name,over_head_costs,product_sales,total_profit.Total profit will not appear in any table in the store database.

# demo
* https://vimeo.com/346804375
* https://vimeo.com/346804751
* https://vimeo.com/346804960
* https://vimeo.com/346805547



