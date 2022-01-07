import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/headers/Headers";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./homepage.css";

export default function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    };
    fetchPost();
  }, []);

  const location = useLocation();

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
