import { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from "../../firebase_connection"
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              navigate('/admin', {replace: true})
            })
            .catch((error) => {
              console.log("ERROR LOGGING IN");
              alert(error);
            })

        } else {
            alert("Fill in all field")
        }
    }

    return (
        <div className='home-container'>
            <h1>Task List</h1>
            <span>Managing your calendar made easy</span>

            <form className='login-form' onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder='email@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Login</button>
            </form>

            <Link to={'/register'} className='button-link'>Don't have an account? Sign-in</Link>
        </div>
    )
}