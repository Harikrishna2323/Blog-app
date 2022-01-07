import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [img, setImg] = useState("");
  const [uploaded, setUploaded] = useState(0);

  //uploading photo
  const upload = async (items) => {
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
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
    dispatch({ type: "UPDATE_START" });
    console.log("Updation in process....");
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      console.log(updatedUser);
      const res = await axios.patch(`/api/users/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log("User updated");
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAIL" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={user.profilePic} alt="profile" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" onClick={handleSubmit}>
            Update
          </button>
          {success && (
            <span style={{ color: "green", marginTop: "10px" }}>
              Profile has been updated.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
