import OrderList from "./components/order/OrderList";
import Home from "./components/Home";
import Registration from "./components/user/Registration";
import Login from "./components/user/Login";
import VueRouter from "vue-router";
import ProductsPage from "./components/product/ProductsPage";

const routes = [
    { path: '/', component: Home },
    { path: '/products', component: ProductsPage},
    { path: '/orders', component: OrderList},
    { path: '/registration', component: Registration},
    { path: '/login', component: Login},
    { path: '*', redirect: '/'}
]

export default new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});