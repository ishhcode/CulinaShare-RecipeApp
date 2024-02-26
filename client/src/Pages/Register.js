import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullname] = useState("");
    const [avatar, setAvatar] = useState(null); // State for avatar image file
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            console.log(avatar);
            const formData = new FormData(); // Create FormData object to send image file
            formData.append('avatar', avatar); // Append the avatar image file
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('fullName', fullName);
            const res = await axios.post("http://localhost:3000/api/users/register", formData, 
            //{
            //     headers: {
            //         'Content-Type': 'multipart/form-data' // Set Content-Type header for FormData
            //     }
            // }
            );
            res.data && window.location.replace("/login");

        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Avatar Image</label>
                <input
                    className="registerInput"
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])} // Update avatar state with selected file
                />
                <label>Username</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Fullname</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your fullname..."
                    onChange={(e) => setFullname(e.target.value)}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="email"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className='link' to='/login'>LOGIN</Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
        </div>
    )
}
