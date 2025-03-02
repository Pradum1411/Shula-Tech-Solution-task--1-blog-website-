
import style from "./css/login.module.css";
import {Header} from "../component/header"
import { Contact } from "./contact";
import {About } from "../component/about"
import { Form, Link} from "react-router-dom";

export const Resetpassword = () => {
 
  return (
    <>
    <Header/>
    <div style={{backgroundColor:"rgb(46, 46, 45)",height:"480px", padding:"90px"}}>
      <center>
        <div className={`${style.container}`}>
          <h2>WelCome To Blog / Reset Password</h2>
          <Form action="/reset" method="post">
            
              <>
                <input type="text" placeholder="Email" name="email" />
                <input type="text" placeholder="Password" name="password" />
                <br />
                <button >Reset</button>
                <br />
                <span>OR</span>
                <br />
                <Link to="/register" className={`${style.other}`}>Create An Account</Link>
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
