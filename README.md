### you can test this app fully working in sandbox mode at:
### **https://sandboxx-orderregister.web.app/#/pedidos**

-------------------

**( navigate between 'novo pedido' (new order) , and 'historico pedidos' (orders display). App still all in portuguese language, it was developed in study context to restaurant located in portugal )**

**RESTAURANT ORDER REGISTRATOR WITH DIRECT COMMUNICATION BETWEEN PRODUCTION TEAM, KITCHEN, AND WAITERS**

**The Problem :**

At the restaurant where I work there are two floors and a backyard. Waiters have to take the orders from those places, and then carry them to the production area where the order is transmitted to the kitchen, and starts being produced ( beverages cutlery etc ). When the restaurant is crowded, waiters have to take for example 3 or more orders before transmitting them to the production area in a piece of paper, only then to be transmitted to the kitchen. 

**The challenge :**

Create a React app where waiters, production and kitchen can be connected. This app has an interface where waiters can easily take up the food and drinks ordered, and a display that updates orders taken from waiters in real time for kitchen and production to start taking care of the order right away. Cutting many steps in communication therefore creating more time.

**Features**

App was developed concerning an easy adaptation to different restaurants, any user can categorize the products in different groups, and create table areas for easier organization. 


**How it works**

Waiters would use the 'Novo pedido' screen ( https://sandboxx-orderregister.web.app/#/pedidos ) on their phone, navigate between products 'Pratos dia' (daily dishes), 'bebidas' (drinks), 'cafetaria' (coffee and coffee drinks), etc. Choose a table ('mesa' in portuguese), and then save 'salvar mesa'. The information appears instantly on 'Historico Pedidos screen'.

_If for example a burger place would use this app, they could easily create a 'burgers' list, by simply editing or adding some values in the react.js component props related to so._


Production and Kitchen have the 'Historico Pedidos' screen ( https://sandboxx-orderregister.web.app/#/historico ) on, where they can check the orders, that are updated at the moment the waiter takes them, and start working on it right away. 

**About the App**

React.js app projected, designed and developed by myself from scratch.

**Dependencies**

.React-dom
.Howler.js
.Firebase
