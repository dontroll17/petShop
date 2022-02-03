import OrderList from "./components/order/OrderList";
import ProductList from "./components/product/ProductList";
import Home from "./components/Home";
import Registration from "./components/user/Registration";
import Login from "./components/user/Login";

export default [
    { path: '/', component: Home },
    {path: '/products', component: ProductList},
    {path: '/orders', component: OrderList},
    {path: '/registration', component: Registration},
    {path: '/login', component: Login}
]