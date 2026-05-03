import Form from "../components/Form";
import { Link } from "react-router-dom";

function Register(){
    return( <div>
        <Form route="/api/user/register/" method="register"></Form>
        <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>)
}
export default Register;