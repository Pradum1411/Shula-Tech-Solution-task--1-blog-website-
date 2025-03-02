import style from "./css/herosection.module.css"

export const HeroSection=()=>{
    return <>
    <div className={`${style.heroImage}`}>
       <spam className={`${style.heroBlog}`}>WelCome To Our Blog {localStorage.getItem("username")}</spam> 
    </div>
    </>
}