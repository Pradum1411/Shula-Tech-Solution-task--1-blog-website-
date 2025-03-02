import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "./css/viewblog.module.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";


export const ViewBlog = () => {
  let [comment1,setcomment1]=useState(null)
  const [blogitem, setBlogItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Correct way to navigate

  if(!localStorage.getItem("userid")){
navigate('/login')
  }
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/user/blogdata", { id });

        // console.log(
        //   `blog item res--: ${response.data.blogdata?.description} ${response.data.status} ${response.data.message}`
        // );

        if (response.data.status !== "ok") {
          
          navigate("/"); // Corrected navigation
        } else {
          // setcomment1(response.data.blogdata.comments)
          // console.log(comment1)
          setBlogItem(response.data.blogdata);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        navigate("/");
      }
    };
    
    fetchBlogData();
  }, [id, navigate]);
    // console.log(id)

    const deleteblog=async(id)=>{
      const response=await axios.post("http://localhost:3000/user/deleteblog",{id})
      if(response.data.status==="ok"){
        navigate("/")
      }
    }
 
    const commenttext=useRef()
    const handleComment=async (data)=>{
      const data1={
        index:data.index,
        username:data.username,
        userId:data.userId,
        blogId:data.blogId,
        comment:commenttext.current.value
      }
      // console.log(data1)
      const response=await axios.post("http://localhost:3000/user/comment",data1)
      if(response.data.status==="ok"){
        commenttext.current.value=""
        console.log("pp",response.data.blogdata1)
        seteditcomment(-1)
        setBlogItem(response.data.blogdata1);
      }
      console.log(commenttext.current.value,response)
    }

    const deletecomment=async (index)=>{
      const response=await axios.post("http://localhost:3000/user/deletecomment",index)
      if(response.data.status==="ok"){
        console.log("delete")
        setBlogItem(response.data.blogdata);
      }
      console.log(commenttext.current.value,response)

    }
    const [editcomment,seteditcomment]=useState(-1)
    const handleEditComment=(ind)=>{
      // console.log(ind)
      seteditcomment(ind.i)
      // deletecomment(ind)
    }

    return <>
    {blogitem? 
    <>
  <div style={{ backgroundImage: `url(${blogitem.image})`, backgroundSize: "cover", backgroundPosition: "center"}} className={style.imgdiv}>
    </div>
    <div className={style.divicon}>
     <FaEdit style={{color:"green", cursor:"pointer", marginRight:"10px"}}/>
     {blogitem.auther._id== localStorage.getItem("userid")?
     <MdDelete style={{color:"red",cursor:"pointer"}}  onClick={() => deleteblog({blogId:blogitem._id,userId:blogitem.auther._id})}/>
    :null }
    </div>
    <div className={style.anoter}>
      <center>Categoty : {blogitem.category} </center>
      <center>Tag : {blogitem.tag_name} </center>
      <p>Auther : {blogitem.auther.name}</p>
      <p>Description : {blogitem.description}</p>
    <textarea name="" ref={commenttext} placeholder="write comment.."></textarea>
    <button onClick={() => handleComment({blogId:blogitem._id,username:localStorage.getItem("username"),index:null,userId:localStorage.getItem("userid")})}>post</button>
  
    </div>
    {blogitem.comments.map((item, i) => (
  <div className={style.showcomment} key={i}>
     {item.userId== localStorage.getItem("userid") && editcomment!==i ?<>
     <FaEdit style={{color:"green", cursor:"pointer", float: "right", fontSize: "25px"}} onClick={()=>handleEditComment({i,blogId:blogitem._id})}/>
    <MdDelete style={{ color: "red", cursor: "pointer", float: "right", fontSize: "25px" }} onClick={()=>deletecomment({i,blogId:blogitem._id})} />
     </>
    :null}
    {editcomment==i?
    <>
    <textarea style={{width:"100%", border:"none",outline: "none"}} ref={commenttext} value={item.commentdata}/> 
    <FaRegSave style={{color:"green", cursor:"pointer", float: "right", fontSize: "25px"}} onClick={() => handleComment({blogId:blogitem._id,index:i,username:localStorage.getItem("username"),userId:localStorage.getItem("userid")})}/>
    <MdDelete style={{ color: "red", cursor: "pointer", float: "right", fontSize: "25px" }} onClick={()=>deletecomment({i,blogId:blogitem._id})} />
    </>
  :<>
    <h4>Author: {item.username}</h4>
    <p>{item.commentdata}</p>
    {/* <p>ccc{localStorage.getItem("userid")},{item.userId}</p> */}
  </>}
  </div>
))}

   
    </>
    :null}
    </> 
  };
  
