export const BASE_URL = "http://localhost:4000/api";
const IMGAGE_BASE_URL = "http://localhost:4000";

export const API_ENDPOINTS = {
  getCategories: `${BASE_URL}/category/get-all-categories`,
  getAllFoodItems: `${BASE_URL}/food/getAllFood`,
  userAuth: `${BASE_URL}/userauth`,
  GET_ALL_CART_ITEMS: "/cart/GetAllCartItems",
  CART_ADD_ITEM: `${BASE_URL}/cart/addCartItems`,
  CART_REMOVE_ITEM: `${BASE_URL}/cart/removeCartItems`,
  getImages: `${IMGAGE_BASE_URL}/images`,
};

//   getProductDetails: (productId) => `${BASE_URL}/products/${productId}`,
//   axios.get(API_ENDPOINTS.getProductDetails(productId))
