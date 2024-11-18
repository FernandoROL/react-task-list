import { useState } from 'react';
import './style.css';

export default function Home() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className='home-container'>
            <h1>Task List</h1>
            <span>Manage your calendar made easy</span>

            <form>
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
        </div>
    )
}