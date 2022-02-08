import Api from "./api/api";

export default {
    state: {
        token: null,
        loginMessage: null,
        orderList: null,
        productList: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLoginMessage(state, loginMessage) {
            state.loginMessage = loginMessage;
        },
        setOrderList(state, orderList){
            state.orderList = orderList;
        },
        setProductList(state, productList){
            state.productList = productList;
        }
    },
    actions: {
        async login({ commit }, userData) {
            const res = await Api.login(userData);
            commit('setToken', res.data.token);
            commit('setLoginMessage', res.data.message);
            setTimeout(() => {
                commit('setLoginMessage', '');
            }, 2000);
        },
        async getOrders({ commit, state }) {
            const res = await Api.getOrders(state.token);
            commit('setOrderList',  res.data.orders);
        },
        async getProducts({ commit }) {
            const res = await Api.getProducts();
            commit('setProductList', res.data.products);
        },
    }
}