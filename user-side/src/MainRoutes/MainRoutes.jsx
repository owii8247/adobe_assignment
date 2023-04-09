import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import UserForm from '../Pages/UserForm'
import UserList from '../Pages/UserList'
import PostForm from '../Pages/PostForm'
import PostList from '../Pages/PostList'
import UserAnalytics from '../Pages/UserAnalytics'
import PostAnalytics from '../Pages/PostAnalytics'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/post-list" element={<PostList />} />
        <Route path="/user-analytics" element={<UserAnalytics />} />
        <Route path="/post-analytics" element={<PostAnalytics />} />
    </Routes>
  )
}

export default MainRoutes