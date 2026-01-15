import React from 'react'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Blogs from './components/Blogs'
import Signin from './pages/Signin'
import CreateBlog from './components/CreateBlog'

function App() {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Blogs/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/signin' element={<Signin/>}></Route>
    <Route path='/blogs' element={<Blogs/>}></Route>
    <Route path='/create-blog' element={<CreateBlog/>}></Route>
    {/* Handle all unknow routes */}
    <Route path='*' element={<h1>This path is Invalid</h1>}></Route>
    </Routes>
      
    </div>
  )
}

export default App