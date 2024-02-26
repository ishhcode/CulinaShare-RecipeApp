
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import './Settings.css'; // Import the CSS file
import About from "../components/About"

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user.message.user._id,
      username,
      email,
      password,
    };
    const updateAvatar= {
      avatar :file
    }
    if(file){
      try {
        const res = await axios.patch("http://localhost:3000/api/users/avatar" , file,{
          headers: { // Example header
            'Authorization': `Bearer ${user.message.accessToken}`
          }});
          console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    
    try {
      const res = await axios.patch("http://localhost:3000/api/users/update-account", updatedUser,{
        headers: { // Example header
          'Authorization': `Bearer ${user.message.accessToken}`
        }});
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={user.message.user.avatar}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.message.user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.message.user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span className="settingsSuccessMessage">
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <About />
    </div>
  );
}
