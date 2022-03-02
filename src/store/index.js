import Vue from "vue";
import Vuex from "vuex";
import * as API from "@/api";

Vue.use(Vuex);

Vue.filter("toCurrency", function (value) {
  if (typeof value !== "number") {
    return value;
  }
  const formatter = new Intl.NumberFormat("sv", {
    style: "currency",
    currency: "SEK",
  });
  return formatter.format(value);
});
//const cart = localStorage.getItem('sinus-cart') ?
//JSON.parse(localStorage.getItem('sinus-cart')) :

export default new Vuex.Store({
  state: {
    items: {},
    cart: [],
    itemList: [],
    currentUser: [],
    users: [],
    orderHistory: [],
  },
  mutations: {
    saveItems(state, items) {
      for (let singleItem of items) {
        if (!state.itemList.find((item) => item.id === singleItem.id)) {
          state.itemList.push(singleItem);
        }
        Vue.set(state.items, singleItem.id, singleItem);
      }
    },
    saveItemsInCart(state, singleItem) {
      const inCart = state.cart.find(
        (cartItem) => cartItem.id == singleItem.id
      );
      if (inCart) {
        inCart.amount++;
      } else {
        state.cart.push({
          id: singleItem.id,
          amount: 1,
          price: singleItem.price,
        });
      }
      //localStorage.setItem("snius-cart", JSON.stringify(state.cart))
    },
    updateCartItem(state, { id, amount }) {
      const inCart = state.cart.find((cartItem) => cartItem.id == id);
      inCart.amount = amount;
    },
    removeCartItem(state, { id }) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id !== id;
      });
    },
    userPush(state, user) {
      state.users.push(user);
    },
    authUsers(state, user) {
      state.currentUser.push(user);
    },
    ordersPlaced(state, order) {
      state.orderHistory.push(order);
    },
    setCheckoutStatus(state, status) {
      state.checkOutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    },
  },

  actions: {
    async fetchItems(context) {
      const response = await API.getItems();
      context.commit("saveItems", response.data);
    },
    addToCart({ commit }, singleItem) {
      commit("saveItemsInCart", singleItem);
    },
    updateCart({ commit }, { id, amount }) {
      commit("updateCartItem", { id, amount });
    },

    async checkout(context, payload) {
      const response = await API.PlacedOrder(
        context.getters.cartIds,
        payload.shippingAddress
      );
      context.commit("ordersPlaced", response.data);
    },

    async registerUser(context, credentials) {
      const response = await API.registerUser(
        credentials.email,
        credentials.name,
        credentials.password,
        credentials.address
      );
      API.saveToken(response.data.token);
      context.commit("userPush", response.data);
    },
    async authUser(context, credentials) {
      const response = await API.authUser(
        credentials.email,
        credentials.password
      );
      API.saveUserToken(response.data.token);
      context.commit("userPush", response.data);
    },
    async userAccount(context) {
      const response = await API.userAccount();
      API.userAuthToken(response.data.token);
      context.commit("authUsers", response.data);
    },
    removeFromCart({ commit }, { id }) {
      commit("removeCartItem", { id });
    },
  },
  getters: {
    cart(state) {
      return state.cart.map((cartItem) => ({
        id: cartItem.id,
        ...state.items[cartItem.id],
        amount: cartItem.amount,
        price: cartItem.price,
      }));
    },
    cartIds(state) {
      const arr = [];
      for (let i = 0; i < state.cart.length; i++) {
        arr.push(state.cart[i].id);
      }
      return arr;
    },
    cartProductId(state) {
      return state.cart.map((cartItem) => ({
        productId: cartItem.id,
      }));
    },
    cartItemCounter(state) {
      let totalAmount = 0;
      state.cart.forEach((cartItem) => {
        totalAmount += cartItem.amount;
      });
      return totalAmount;
    },
    currentUser(state) {
      return state.currentUser;
    },
    total(state) {
      let total = 0;
      state.cart.forEach((cartItem) => {
        total += cartItem.price * cartItem.amount;
      });
      return total;
    },
    getOrderHistory(state) {
      return state.orderHistory;
    },
  },
  modules: {},
});
