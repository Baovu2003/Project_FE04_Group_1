import Footer from './Footer/Footer';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import "./LayoutDefaultClient.css";
import { getCookie } from "../../Helpers/Cookie.helper";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse } from "../../actions/types";
import { RootState } from "../../store/store";
import { get } from "../../Helpers/API.helper";
import { userActions } from '../../actions/UserAction';
import { useEffect } from 'react';
import socket from "./Chat/socket";
function LayoutDefaultClient() {
  const tokenUser = getCookie("tokenUser"); // Lấy token từ cookie
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserReducer);

  console.log(user)
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken: ApiResponse = await get(`http://localhost:5000/user/${tokenUser}`);
        if (accountByToken && accountByToken.user) {
          // Nếu API trả về thông tin người dùng, cập nhật vào Redux store
          dispatch(userActions(accountByToken)); // Truyền user vào userActions
        } else {
          throw new Error("User not found in the response.");
        }
      } catch (error) {
        console.error("Error fetching account by token:", error);
        // navigate("/"); // Điều hướng nếu cần thiết khi gặp lỗi
      }
    };

    // Nếu có token thì mới gọi API để lấy thông tin người dùng
    if (tokenUser) {
      fetchApi();
    }
  }, [tokenUser, dispatch]);

  useEffect(() => {
    // Listen for socket connection
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("connect");
    };
  }, []);


  return (
    <>
      <div id="app">
        <header>
          <Header />
        </header>

        <main>

          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default LayoutDefaultClient;
