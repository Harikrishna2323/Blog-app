import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [uploaded, setUploaded] = useState(0);
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const handleUpload = async (items) => {
    items.forEach((item) => {
      const metadata = {
        contentType: "image/jpeg",
      };

      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, "images/" + fileName);
      // const uploadTask = storage.ref(`/images/${fileName}`).put(item.file);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", url);
            setImg(url);
            setUploaded(1);
          });
        }
      );
    });
  };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      username: user.username,
      desc,
      photo: img,
    };
    if (img) {
      const data = new FormData();
      const filename = Date.now() + img.name;
      data.append("name", filename);
      data.append("img", URL.createObjectURL(img));
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      console.log(newPost);
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/api/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <input type="file" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        {uploaded === 1 ? (
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        ) : (
          <button type="button" className="writeSubmit" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default Write;
