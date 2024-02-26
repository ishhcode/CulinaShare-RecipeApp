import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import { LoginSuccess } from '../context/Actions';


export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch(LoginSuccess(res.data));
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className="loginInput"
                    type="text"
                    placeholder="enter your username..."
                    ref={userRef}
                />
                <label>Password</label>
                <input className="loginInput"
                    type="password"
                    placeholder="enter your password..."
                    ref={passwordRef}

                />
                <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton" >
                <Link className='link' to='/register'>REGISTER</Link>
            </button>
        </div>
    )
}