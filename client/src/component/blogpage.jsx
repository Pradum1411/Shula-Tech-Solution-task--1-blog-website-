import style from "./css/blogpage.module.css";
import { FcLike } from "react-icons/fc";
import { LuHeart } from "react-icons/lu";
import { BsHeartFill } from "react-icons/bs";
import { BiExpand } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { RxCross1 } from "react-icons/rx";
import { Form, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
export const BlogPage = () => {
  const userid = localStorage.getItem("userid");
  const [value, setValue] = useState("");
  const [file, setfile] = useState(null);
  const d1 = useRef("");
  const d2 = useRef("");
  const d3 = useRef("");
  const options = [
    { label: "Technology", value: "Technology" },
    { label: "Music", value: "Music" },
    { label: "Movie", value: "Movie" },
    { label: "Sport", value: "Sport" },
    { label: "Fashion", value: "Fashion" },
  ];
  const OptionValue = (e) => {
    setValue(e.target.value);
  };

  const [image, setimage] = useState();
  
  const getfile = (event) => {
    if (event.target.files[0]) {
      setfile(event.target.files[0]);
      setimage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const uploadfiles = () => {
    document.getElementById("id1").click();
  };

  const [createpost, setcreatepost] = useState(false);

  const navigate = useNavigate();
  const submitform = async () => {
    const formdata = {
      userid: userid,
      file: file,
      aa: d1.current.value,
      aa1: d2.current.value,
      aa2: d3.current.value,
    };
    const resp = await axios.post("http://localhost:3000/user/blog", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (resp.data.status == "ok") {
      // alert("blok created");
      toast.success("blok created..", {
              position: "top-right",
              autoClose: 2000, // Closes after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });

    } else {
     toast.error("Blog not Created..", {
             position: "top-right",
             autoClose: 2000, // Closes after 3 seconds
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             theme: "light",
           });
    }
    navigate("/");
    setcreatepost(false);
  };

  const [blogitem, setblogitem] = useState([]);
  const[like,setLike]=useState(false)
  const[dislike,setdisLike]=useState(false)
  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/getblog");
        const result = response.data.blogitem;
        setblogitem(result);
        console.log("bo--", blogitem);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [createpost, like, dislike]);
  console.log("bo1--", blogitem);
  const createPost = async () => {
    if (createpost == false) {
      if (!userid) {
        return navigate("/login");
      }
      // console.log("ko--", userid);
      setcreatepost(true);
    } else {
      console.log(d1.current.value, d2.current.value, d3.current.value);
      setcreatepost(false);
    }
  };
  const [blogCategory, setBlogCategory] = useState("All");
  const categories = (e) => {
    setBlogCategory(e.target.name); 
  };
const likeblog=async(like)=>{
  const data={blogId:like.blogId,
    userId:localStorage.getItem("userid")
  }

  const response=await axios.post("http://localhost:3000/user/likepost",data)
  if(response.data.status=="ok"){
    // console.log("ji--",response)
    setLike(true)
    setdisLike(false)
    navigate('/')
  }
  console.log("lk--",response)
}
const dislikeblog=async(like)=>{
  const data={blogId:like.blogId,
    userId:localStorage.getItem("userid")
  }
  // console.log("dislike--",response)
  const response=await axios.post("http://localhost:3000/user/dislikepost",data)
  if(response.data.status=="ok"){
    // console.log("ji--",response)
    setdisLike(true)
    setLike(flase)
    // setblogitem(response.data.blogdata)
    navigate('/')
  }
}
  return (
    <>
      {createpost == true ? (
        <>
          <div className={`${style.create_blog}`}>
            <h2>
              <center style={{ color: "white" }}>Create New Blog</center>
            </h2>
            <button
              style={{
                float: "right",
                marginTop: -35,
                marginRight: 15,
                color: "red",
                background: "rgb(34, 33, 33)",
                cursor: "pointer",
              }}
              onClick={createPost}
            >
              <RxCross1 />
            </button>
            <Form action="#" onSubmit={submitform}>
              <div className={`${style.dropdown}`}>
                <div className={`${style.dropdownleft}`}>
                  <select
                    onChange={OptionValue}
                    className={`${style.select_category}`}
                    name="category"
                    ref={d1}
                  >
                    {options.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <br />
                  <input
                    type="button"
                    onClick={uploadfiles}
                    value="Select Image.."
                  />
                  {/* <button  onClick={uploadfiles}>Select Image..</button> */}
                  <input
                    style={{ display: "none" }}
                    id="id1"
                    type="file"
                    onChange={getfile}
                    name="file"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="tag Name"
                    name="tag"
                    ref={d2}
                  />
                </div>
                <div>
                  {image ? (
                    <>
                      <img src={image} alt="img" width={240} height={150} />
                    </>
                  ) : null}
                </div>
              </div>
              <textarea
                name="dec"
                ref={d3}
                style={{
                  height: 100,
                  fontSize: 20,
                  width: 440,
                  marginLeft: 30,
                  background: "rgb(34, 33, 33)",
                  color: "white",
                }}
                type="textarea"
                placeholder="Description---"
              />
              <center>
                <button className={`${style.submitpost}`}>Submit</button>
              </center>
            </Form>
          </div>
        </>
      ) : null}
      <div className={`${style.mainblog}`}>
        <div className={`${style.leftside}`}>
          <button onClick={createPost}>Create Blog</button>
          <br />
          <button name="All" id="All" onClick={categories}>
            All Blog
          </button>
          <br />
          <button name="Sport" id="Sport" onClick={categories}>
            Sport
          </button>
          <br />
          <button name="Technology" id="Technology" onClick={categories}>
            Technology
          </button>
          <br />
          <button name="Music" id="Music" onClick={categories}>
            Music
          </button>
          <br />
          <button name="Movies" id="Movies" onClick={categories}>
            Movies
          </button>
          <br />
          <button name="Fashion" id="Fashion" onClick={categories}>
            Fashion
          </button>
        </div>
        <div className={`${style.rightside}`}>
          {!blogitem ? null : (
            <>
              {blogitem.map((item) => (
                //  { blogCategory == item.category? "hhh":null }
                <span>
                  {blogCategory==item.category || blogCategory=="All" ?
                  <>
                <div key={item._id} className={`${style.card}`}>
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className={`${style.bcimage}`}
                  >
                    <span className={`${style.icon}`}>
                      <sup style={{fontSize:"14px"}}>{item.likes.length}</sup>
                      {item.likes.includes(localStorage.getItem("userid"))? <>
                      <FcLike style={{ cursor: "pointer" }} onClick={()=>dislikeblog({blogId:item._id})}  /> 
                      </>: 
                      <LuHeart style={{ cursor: "pointer" }} onClick={()=>likeblog({blogId:item._id})}/>
                      }
                      <br/>

                      <span style={{ cursor: "pointer" }}>
                        <Link to={`/viewblog/${item._id}`}>
                          <BiExpand />
                        </Link>
                      </span>
                      </span>
                  </div>
                  <center>
                    <b>{item.category}</b>
                    <br />
                    <b>{item.tag_name}</b>
                    <br />
                    <strong>Auther:{item.auther.name}</strong>
                  </center>
                  <p>description {item.description}</p>
                </div>
                  </> :null}
                </span> 
              ))}
            </>
          )}

          
        </div>
      </div>
    </>
  );
};
