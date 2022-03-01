import { useState } from "react";

const LogInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // code to send user info would go here
    }

    return (
        <div className="login">
            <h1>Log In! (Not real)</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input
                        type='text'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>
                <label>
                    Password: 
                    <input
                        type='text'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <button>Log in</button>
            </form>
        </div>
    );
}
 
export default LogInPage;