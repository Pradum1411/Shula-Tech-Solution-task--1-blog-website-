import { About } from "./component/about"
import { BlogPage } from "./component/blogpage"
import { Contact } from "./component/contact"
import { Header } from "./component/header"
import { HeroSection } from "./component/herosection"
import { ToastContainer } from 'react-toastify';
export const Home=()=>{
    return <>
  
    <Header/>
    <HeroSection/>
    <BlogPage/>
    <About/>
    <Contact/>
    <ToastContainer />
    </>
}