import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
// --------------------------------------------------------------------------------------
function CreateBlog() {
    const [title,setTitle]=useState({title:"",description:""});
    //const [description,setdescription]=useState("");
    if(!localStorage.getItem("user")){
        return <Navigate to={"/signup"}></Navigate>
    }
    let token=JSON.parse(localStorage.getItem("user"));
    if(!token){
        return <Navigate to={"/signup"}></Navigate>
    }
    async function handlesubmit(e){
        
        // alert(JSON.stringify(userdata));
         let blogdata=await fetch("http://localhost:3000/api/v1/blogs",{
           method:'POST',
           body:JSON.stringify(title),
            headers:{
                     "Content-type":"application/json",
                     "Authorization":`Bearer ${token.token}`
                 }
         });
         let res=await blogdata.json();
        //  console.log(res);
         alert(res.message);
        //  if(res.success){
        //      localStorage.setItem("user",JSON.stringify(res.Users))
        //  }
        //  console.log(res);
       }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
          Create Blog
        </h1>
        <form className="mt-6"  onSubmit={handlesubmit}>
          <div className="mb-2">
            <label>
              <span className="text-gray-700">Your Blog Title</span>
              <input
                type="text"
                name="name"
                className="
                w-full
                block px-16 py-2 mt-2
                border-gray-300
                rounded-md
                shadow-sm
              focus:border-indigo-300
                focus:ring
                focus:ring-indigo-200
                focus:ring-opacity-50"
                placeholder="Title"
                onChange={(e)=>setTitle((prev)=>({
                ...prev,title:e.target.value
                }))}
              />
            </label>
          </div>
          <div className="mb-2">
            <label>
              <span className="text-gray-700">Description</span>
              <textarea
                name="message"
                placeholder='Description'
                onChange={(e)=>setTitle((prev)=>({
                ...prev,description:e.target.value
                }))}
                className="
            block
            w-full
            mt-2 px-16 py-8
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                rows="5"
              ></textarea>
            </label>
          </div>
          <div className="mb-6">
            <button
              type="submit" 
             
              className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800"
            >
              Create 
            </button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};
        


export default CreateBlog