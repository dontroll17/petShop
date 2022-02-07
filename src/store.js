import axios from "axios";

export default {
    state: {
        token: null,
        loginMessage: null,
        orderList: null
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
        }
    },
    actions: {
        async login({ commit }, userData) {
            const res = await axios.post('http://localhost:1111/user/login', {
                email: userData.email,
                password: userData.password
            });
            commit('setToken', res.data.token);
            commit('setLoginMessage', res.data.message);
            setTimeout(() => {
                commit('setLoginMessage', '');
            }, 2000);
        },
        async getOrders({ commit, state }) {
            const res = await axios.get('http://localhost:1111/orders',{
                headers: {
                    'Authorization': `token ${state.token}`
                }
            });
            commit('setOrderList',  res.data.orders);
        }
    }
}