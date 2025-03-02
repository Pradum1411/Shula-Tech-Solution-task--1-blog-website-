import { Login } from "./component/login";
import { Register } from "./component/register";
import { Home } from "./home";
import { Resetpassword } from "./component/reset";
import { ViewBlog } from "./component/viewblog";
import axios from "axios";
import { toast } from 'react-toastify';
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

export function App() {
  const userLoginData = async ({ request }) => {
    const response = await request.formData(); // Extract form data
    const data = Object.fromEntries(response); // ✅ Convert to object
    const resp=await axios.post("http://localhost:3000/user/login",data)
    
    // console.log("userLoginData Data:", data,resp.data);
    if(resp.data.status=="ok"){
      localStorage.setItem("userid",resp.data.id )
      localStorage.setItem("username",resp.data.username )
      // toast("Wow so easy!");
      toast.success("Login Successful..", {
        position: "top-right",
        autoClose: 2000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return redirect("/")
    }else{
      console.log("pp   ",resp.data.message)
      localStorage.setItem("errorMessage",resp.data.message)
      return redirect("/login")
      // return redirect("/login")
    }
    
  };

  const userRegisterData = async ({ request }) => {
    const response = await request.formData();
    const data = Object.fromEntries(response);
    const resp=await axios.post("http://localhost:3000/user/register",data)
    if(resp.data.status=="ok"){
      localStorage.setItem("userid",resp.data.id )
      localStorage.setItem("username",resp.data.username )
      toast.success("Registation Successful..", {
        position: "top-right",
        autoClose: 2000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return redirect("/")
    }else{
      toast.error("Registation Failed..", {
        position: "top-right",
        autoClose: 2000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return redirect("/register")
    }
  };

  const userResetData = async ({ request }) => {
    const response = await request.formData();
    const data = Object.fromEntries(response);
    const resp=await axios.post("http://localhost:3000/user/reset",data)
    if(resp.data.status=="ok"){
      return redirect("/")
    }
    return redirect("/reset")
  };

  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      
    },
    {
      path: "/login",
      element: <Login />,
      action: userLoginData,
    },
    {
      path: "/register",
      element: <Register />,
      action: userRegisterData,
    },
    {
      path: "/reset",
      element: <Resetpassword />,
      action: userResetData,
    },
    {
      path: "/viewblog/:id",
      element: <ViewBlog  />,
      // action: blogData,
    },
    
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
