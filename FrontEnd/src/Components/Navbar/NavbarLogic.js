import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoginModal,
  _loginModal,
  _token,
  SetToken,
  _user,
} from "../../app/features/UserAuth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../API EndPoints/API_ENDPOINTS";

export const useNavbarLogic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const Quantity = useSelector((state) => state.cartSlice.totalItems);
  const ShowLoginScreen = useSelector(_loginModal);
  const token = localStorage.getItem("userToken");
  const userModel = useSelector(_user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userCreds = userModel;
    //this is for byte[] image
    // if (userCreds && userCreds?.image && userCreds?.image?.data) {
    //   const byteArray = new Uint8Array(userCreds?.image?.data);
    //   const base64String = btoa(
    //     byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
    //   );
    setImage(`${API_ENDPOINTS.getImages}/${userCreds.image}`);
    // }
  }, [userModel]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    dispatch(SetToken(""));
    navigate('/home')
  };

  const ShowModal = (item) => {
    dispatch(showLoginModal(item));
  };

  return {
    menuOpen,
    Quantity,
    ShowLoginScreen,
    token,
    image,
    toggleMenu,
    logout,
    ShowModal,
    navigate,
  };
};
