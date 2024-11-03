import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="form-container">
      <form className="login signup" onSubmit={handleSubmit}>
        <h3 className="login-title">Log in</h3>
        <p className="lets_get_started">Welcome back!</p>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
        <p className="already">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p className="privacy-text">
          Forgot your email/password? <a href="/">Click here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
