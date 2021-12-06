import '../App.css';
import { useState, useContext } from 'react';
import AuthContext from '../context';


const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [data, setData] = useState({ login: '', password: '' })
    const login = { login: 'user', password: "1234" }
    const onChange = (e) => {
        if (e.target.id === 'login') {
            setData({ ...data, login: e.target.value })
        }
        else {
            setData({ ...data, password: e.target.value })
        }
    }
    const onLogin = () => {
        if (data.login === login.login && data.password === login.password) {
            setIsAuth(true);
            localStorage.setItem('auth', 'true')
        }
    }

    return (

        <div className="center-div">
            <div className="login-block">
                <h2>Авторизация</h2>
                <form action="" id="login" className="form-class">
                    <div className="login-field">
                        <div className="field">
                            <i className="login-margin material-icons prefix">account_circle</i>
                            <input id="login" type="text" className="validate" onChange={onChange} />
                        </div>
                        <div className="field">
                            <i className="login-margin material-icons prefix">dialpad</i>
                            <input id="password" type="tel" className="validate" onChange={onChange} />
                        </div>
                    </div>
                    <div className="button-section">
                        <button onClick={() => onLogin()} className="btn waves-effect waves-light" type="submit" name="action">
                            Login
                            <i className="material-icons right">account_box</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;