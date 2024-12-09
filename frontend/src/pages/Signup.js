import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../styles/login_signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, username, password);
  };

  return (
    <div className="form-container">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <p className="lets_get_started">
          Let's get started with your free account
        </p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
        <p className="already">
          Already have an account? <a href="/login">Log in</a>
        </p>
        <p className="privacy-text">
          By signing up to create an account I accept TuneLink's{" "}
          <a href="/">Terms of Use and Privacy Policy</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
