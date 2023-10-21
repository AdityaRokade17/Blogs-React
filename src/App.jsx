import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { AppContext } from "./context/AppContext";
import { Route } from "react-router-dom";

function App() {

  const {fetchBlogPosts} = useContext(AppContext);

  useEffect(() => {
    fetchBlogPosts();
  },[]);

  return (
    // <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center ">
    //   <Header/>
    //   <Blogs/>
    //   <Pagination/>
    // </div>

    <Routes>

      <Route path="/" element = {<Home/>} />
      <Route path="/blog/:blogId" element = {<BlogPage/>} />
      <Route path="/tags/tag" element = {<TagPage/>} />
      <Route path="/categories/:category" element = {<CategoryPage/>} />

    </Routes>
  );
}

export default App;
