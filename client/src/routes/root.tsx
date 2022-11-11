import Navbar from "../components/Navbar";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  )
}