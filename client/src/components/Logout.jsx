import { useNavigate } from 'react-router-dom';

const Login = () => {
    // State variables
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem("user");
        navigate("/login");
      }


    return (
      <div className="login-wrapper">
      <h1>Log Out</h1>
          <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
    );
} 
     
export default Login;