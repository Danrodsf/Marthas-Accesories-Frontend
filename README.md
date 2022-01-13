# Martha's Accesorios Web App.

<div id="top"></div>

  <h3>Martha's Accesories Frontend.</h3>

Daniel Rodriguez
[![LinkedIn][linkedin-shield]][linkedin-url]

  <p>
    Martha's Accesories Frontend.
    <br />
    <a href="https://deploy-aws.d193hgukjbwp44.amplifyapp.com/">https://deploy-aws.d193hgukjbwp44.amplifyapp.com/</a>
    <br />
    <a href="https://github.com/Danrodsf/Marthas-Accesories-Frontend/issues">Reportar un Error</a>
  </p>
</div>

## About the Frontend.

The site is an e-commerce web app for women accesories, created to improve the reach and contact with potential clients.
The frontend is made in React.js, as a singlepage application, in order to allow fluid transitions withing views, without needing to reload the HTML. React Redux was used to allow user's data to persist even when closing the web app, data such as login info, Json Web Token, and shopping cart are safely stored in user's session, removing the need to login again and redo the shopping cart from start.

### Views.

The frontend contains 14 views

1. `Home` - Landing page of the site.
2. `SignUp` - User's can register an account in this view.
3. `SignIn` - User's can log into their account, this is required to add items to wishlist, to cart, and to create an order.
4. `UserHub` - Main user view, with links to profile, messages, orders, wishlist and a logout link.
5. `Profile` - User's info view with editable inputs.
6. `Messages` - In this view, user's can review all messages sent to admins and responses recieved.
7. `Wishlist` - User's wishlish view with all products added by the user.
8. `Orders` - View containing all orders made by the user. With detailed information for each order.
9. `Products` - A main view of all the products in the store.
10. `SearchProducts` - View with dynamic search results.
11. `ProductDetail` - Individual detailed information of the product choosen by the user.
12. `Cart` - Shopping cart, with all products added the cart by the user to make an order.
13. `OrderConfirm` - Shopping cart, with all products added the cart by the user to make an order.
14. `Contact` - User's can send a message to an admin via this view.

### Features.

```
● User register, login and logout.
● Users authentication by token (JWT).
● Users can view and edit their own profile.
● Users can send messages to an Admin and view both their messages and responses.
● Users can add, view and remove products from their own wishlist.
● Users can view all products.
● Users can add, view and remove products from shopping cart.
● Users can create orders from items in shopping cart.
● Users can review all of their orders.
● Users can search for products by name.
● Product Pagination from API.

```

##### Admin CMS

```
● Admin DashBoard with general data.
● Admin Client view with data of all registered users with delete and edit functions.
● Admin Orders view with data of all Orders made with add, delete and edit functions.
● Admin Products view with data of all products in the DB with add, delete and edit functions.
● Admin Messages view with data of all messages sent by users with delete and edit functions.
```

### Tecnologies.

The technologies used for this project were the following:

- [React.js](https://es.reactjs.org/).
- [Node.js](https://nodejs.org/).
- [Axios](https://axios-http.com/).
- [React-Router-Dom](https://reactrouter.com/).
- [Redux.js](https://redux.js.org/).
- [Sass](https://sass-lang.com/).

### How to install.

1. It is required to have `Node.js` installed on the system in order to install the dependencies.

2. To install locally you must execute the command `npm install`.

3. To use with your own API, you must change the links in each function calling axios to connect to your API. You can download the API via (https://github.com/Danrodsf/Marthas-Accesories-Backend).

4. You can view the site locally using the command `npm start`.

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/danielrodriguezserafin/

### Future implementations.

```
● Payment system.
● Improve UI/UX.
● Customization of products.

```

<p align="right">(<a href="#top">Go to Top</a>)</p>
