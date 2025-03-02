import {Header} from "../component/header"
import { Contact } from "./contact";
import {About } from "../component/about"
import style from "./css/login.module.css";

import { Form , Link} from "react-router-dom";

export const Register = () => {
  

  return (
    <>
        <Header/>
    <div style={{backgroundColor:"rgb(46, 46, 45)",height:"480px", padding:"90px"}}>
      <center>
        <div className={`${style.container}`}>
          <h2>WelCome To Blog / Register</h2>
          <Form action="/register" method="post">
              <>
                <input type="text" placeholder="username" name="name" />
                <input type="text" placeholder="Email" name="email" />
                <input type="text" placeholder="Password" name="password" />
                <br />
                <button>Sign up</button>
                <br />
                <span>OR</span>
                <br />
                <Link to="/login" className={`${style.other}`}>Alredy Register</Link>
                <Link to="/reset" className={`${style.other}`}>Forgate Password</Link>

              </>
       
          </Form>
        </div>
      </center>
      </div>
      <Contact/>
            <About/>
    </>
  );
};
