import style from "./css/about.module.css"

export const About = () => {
  return (
    <>
    <div className={style.about_div}>
      <h1 id="about">
        <center> About Us</center>
      </h1>
      <p>
        <b>Welcome to our Blog!</b><br/>
         At <b>our Blog</b>, we are passionate
        about [main topics your blog covers]. Our goal is to provide insightful,
        engaging, and valuable content that informs and inspires our readers.
      </p><br/>
      <h2>Our Mission</h2>
      <p>We strive to create a platform where ideas, knowledge, and experiences come together. Whether you're here for expert advice, personal stories, or the latest trends, we've got something for you.</p>
      </div>
    </>
  );
};
