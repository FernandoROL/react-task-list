import { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleLogin(e) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            alert("Cool")
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