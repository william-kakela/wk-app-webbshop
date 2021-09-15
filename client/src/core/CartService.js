import Api from "./api.js";

export default {
    getCart() {
        return Api().get("cart");
    },
    addProductToCart(product) {
        return Api().post(`cart`, product);
    },
    deleteProductInCart(id) {
        return Api().delete(`cart/${id}`);
    }
};
