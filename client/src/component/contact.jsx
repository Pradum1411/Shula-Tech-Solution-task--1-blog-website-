import style from "./css/contact.module.css"
import {Form} from "react-router-dom"
export const Contact=()=>{
    return <>
    <div className={style.contact_container}>
        <Form method="post" action>
    <h1 id="contact">Contact</h1>
    <label htmlFor="name">Your Name</label><br/>
    <input type="text" id="name" required/><br/>
    <label htmlFor="email">Your Email</label><br/>
    <input type="text" id="email" required/><br/>
    <label htmlFor="message">Your Message</label><br/>
    <textarea name="" id="message" required/><br/>
    <button type="reset"> Submit</button>
    </Form>
    </div>
    </>
}