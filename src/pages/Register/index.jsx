import { useState } from 'react';
import '../Home/style.css';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase_connection';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function Register() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth,email, password)
            .then(() => {
              navigate('/admin', {replace: true})
            })
            .catch((error) => {
              console.log("ERROR CREATING USER: " + error);
              alert(error);
            })
        } else {
            alert("Fill in all field")
        }
    }

    return (
        <div className='home-container'>
            <h1>Register new account</h1>
            <span>Let's start by creating your account</span>

            <form className='login-form' onSubmit={handleRegister}>
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

                <button type='submit'>Register</button>
            </form>

            <Link to={'/'} className='button-link'>Already have an account? Log-in</Link>
        </div>
    )
}