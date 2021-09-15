import Api from "./api.js";

export default {
    getProducts() {
        return Api().get("products");
    }
};
