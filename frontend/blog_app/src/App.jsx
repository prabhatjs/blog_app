import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [userdata, setuserdata] = useState({name:"",email:"",password:""});

  async function handlesubmit(){
   // alert(JSON.stringify(userdata));
    let userdatasend=await fetch("http://localhost:3000/users",{
      method:'POST',
      body:JSON.stringify(userdata),
       headers:{
                "Content-type":"application/json"
            }
    });
    let res=await userdatasend.json();
    alert(res.message);
    console.log(res);
  }

  return (
    <div className='pt-4'>
  <form className="max-w-sm mx-auto">
  <h1 className='text-3xl pt-8 mt-8 '>Sign up</h1>
  <div className="mb-5 pt-8">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
    <input type="text" id="name" onChange={(e)=>setuserdata((prev)=>({
      ...prev,name:e.target.value
    }))}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="mb-5 ">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" onChange={(e)=>setuserdata((prev)=>({
      ...prev,email:e.target.value
    }))}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" onChange={(e)=>setuserdata((prev)=>({...prev,password:e.target.value}))}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handlesubmit}>Submit</button>
</form>
</div>
  )
}

export default App
