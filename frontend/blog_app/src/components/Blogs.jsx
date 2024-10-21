import React, { useEffect, useState } from 'react'

function Blogs() {
    const [blogs,setblogs]=useState([]);
    async function fetechBlogs(){
        let data=await fetch('http://localhost:3000/api/v1/blogs');
        let res=await data.json();
        setblogs(res.getBlogs);
    }
    useEffect(()=>{
        fetechBlogs();
    },[]);
  return (<>
  {
    blogs.map((myblog)=>(
        <ul>
            <li>{myblog.title}</li>
            <p>{myblog.description}</p>
            <p>{myblog.creator.name}</p>
        </ul>
    ))
  }
  </>
  )
}

export default Blogs