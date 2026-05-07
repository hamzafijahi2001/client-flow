import Form from "../components/Form";
import { Link } from "react-router-dom";
import "../styles/Register.css"

function Register(){
    return( <div>
        <Form route="/api/user/register/" method="register"></Form>
        <div className="login-link">
        <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
      </div>
    </div>)
}
export default Register;