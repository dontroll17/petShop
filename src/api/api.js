import axios from "axios";
const baseUrl = 'http://localhost:1111';

const Api = {
    login(userData) {
        return axios.post(`${baseUrl}/user/login`, {
            email: userData.email,
            password: userData.password
        });

    },
    registration(userData) {
        return axios.post(`${baseUrl}/user/signup`, {
            email: userData.email,
            password: userData.password
        });

    },

    getProducts() {
        return axios.get(`${baseUrl}/products`);
    },
    getProductDetails(id) {
        return axios.get(`${baseUrl}/products/${id}`);
    },
    createProduct(token, fileData) {
        return axios.post(`${baseUrl}/products`,fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        });
    },
    updateProduct(token, productId, fileData) {
        return axios.patch(`${baseUrl}/products/${productId}`,fileData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        });
    },
    deleteProduct(token, id) {
        return axios.delete(`${baseUrl}/products/${id}`,{
            headers: {
                'Authorization': `token ${token}`
            }
        });
    },

    getOrders(token) {
        return axios.get(`${baseUrl}/orders`,{
            headers: {
                'Authorization': `token ${token}`
            }
        });
    },
    getOrderDetails(token, orderId) {
        return axios.get(`${baseUrl}/orders/${orderId}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
    },
    createOrder(token, orderData) {
        return axios.post(`${baseUrl}/orders`, {
            productId: orderData.productId,
            quantity: parseInt(orderData.quantity)
        }, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
    },
    deleteOrder(token, id) {
        return axios.delete(`${baseUrl}/orders/${id}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
    }
}

export default Api;