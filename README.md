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

    items for sale
    
*********************************
┌─────────┬───────────────────────┬─────────────────┬───────┐
│ item_id │          product_name │ department_name │ price │
├─────────┼───────────────────────┼─────────────────┼───────┤
│       1 │    Himalaya face wash │   Beauty&health │    10 │
│       2 │      Aveeno face wash │   Beauty&health │    20 │
│       3 │        Olay face wash │   Beauty&health │    16 │
│       4 │              iphone6s │     Electronics │   599 │
│       5 │               iphone7 │     Electronics │   799 │
│       6 │               iphone8 │     Electronics │   999 │
│       7 │     samsung galaxy s7 │     Electronics │   600 │
│       8 │        Mac Foundation │   Beauty&health │    30 │
│       9 │      Lakme Foundation │   Beauty&health │    13 │
│      10 │             maybeline │   Beauty&health │     9 │
│      11 │ Mac Ruby woo lipstick │   Beauty&health │    18 │
│      12 │ mac powder foundation │   Beauty&Health │    35 │
│      13 │ mac powder foundation │   Beauty&Health │    35 │
│      14 │ mac powder foundation │   Beauty&Health │    35 │
│      15 │             lenovo pc │     Electronics │  1020 │
│      16 │             HP laptop │     Electronics │   899 │
│      17 │           Photo Frame │      Home Decor │    34 │
│      18 │               Dell PC │     Electronics │  1345 │
│      19 │    EXO washing Liquid │       Household │    23 │
│      20 │             Air Fryer │         kitchen │   100 │
└─────────┴───────────────────────┴─────────────────┴───────┘

? Enter ID of the product you would like to buy. 1
? Enter Quantity 3
item available!total stock7
? DO YOU WANT TO ADD ITEM TO CART? yes

 Successfully added to cart!

Shopping Cart
[*]      item:Himalaya face wash
[*]      price:10
[*]      Quantity:3

Cart Total:30

-------------------------------
? Do you want to continue shopping? (Use arrow keys)
> Yes
No

yes->[will show the products for sale and customer can add as                 many items to cart]

No->

 Do you want to continue shopping? No

-----------------------------
? Do you want to place order? Yes
Successfully placed order!!!
Order Total:30

-----------------------------
stock updated successfully
 [do you want place order if  customer choose yes then order fulfilled]

-----------------------------
? Do you want to place order? No
Thanks for visiting !!