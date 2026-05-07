import Form from "../components/Form";
import { Link } from "react-router-dom";
import "../styles/Login.css"

function Login(){
    return (  <div>
        <Form route="/api/token/" method="login"></Form>
        <div className="register-link">
        <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
      </div>
    </div> )
}
export default Login;