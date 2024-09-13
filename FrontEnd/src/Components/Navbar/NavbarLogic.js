import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetToken, showLoginModal } from "../../app/features/AuthSlice";
import { useNavigate } from "react-router-dom";

export const useNavbarLogic = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const Quantity = useSelector((state) => state.cartSlice.totalItems);
  const ShowLoginScreen = useSelector((state) => state.authSlice.showLogin);
  const token = useSelector((state) => state.authSlice.Token);
  const userModel = useSelector((state) => state.authSlice.user);
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
      setImage(`http://localhost:4000/images/${userCreds.image}`);
    // }
  }, [userModel]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    dispatch(SetToken(""));
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
