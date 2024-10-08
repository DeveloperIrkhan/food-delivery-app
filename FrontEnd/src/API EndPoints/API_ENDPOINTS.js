export const BASE_URL = "http://localhost:4000/api";
const IMGAGE_BASE_URL = "http://localhost:4000";

export const API_ENDPOINTS = {
  getCategories: `${BASE_URL}/category/get-all-categories`,
  getAllFoodItems: `${BASE_URL}/food/getAllFood`,
  userAuth: `${BASE_URL}/userauth`,
  GET_ALL_CART_ITEMS: "/cart/GetAllCartItems",
  CART_ADD_ITEM: "/cart/AddtoCart",
  CART_REMOVE_ITEM: "/cart/RemoveFromCart",
  getImages: `${IMGAGE_BASE_URL}/images`,
  placeOrder: "/order/placeorder"
};

//   getProductDetails: (productId) => `${BASE_URL}/products/${productId}`,
//   axios.get(API_ENDPOINTS.getProductDetails(productId))
