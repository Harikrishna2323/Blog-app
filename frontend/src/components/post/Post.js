import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img, post }) {
  console.log(post);
  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={post.photo} alt={post.photo} />
      )}

      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            {post.categories.map((c) => (
              <span>{c.name}</span>
            ))}
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
