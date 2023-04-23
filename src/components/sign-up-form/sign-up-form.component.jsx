import {useState} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.util";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
    setFormFields(defaultFormFields)
    }

    const handelFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not much")
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            )
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Email is already in use")
            } else {
                console.log("error in user creation proccess", error)
            }
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormFields({...formFields, [name]: value})
    }
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handelFormSubmit}>
                <label>Display Name</label>
                <input 
                    type="text" 
                    required
                    name="displayName"
                    value={displayName}
                    onChange={handleInputChange}
                />

                <label>Email</label>
                <input
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />

                <label>Password</label>
                <input
                    type="password"
                    required
                    name="password"
                    value={password} 
                    onChange={handleInputChange}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange}
                />

                <button type="submit">Sign Up</button>

            </form>
        </div>
    )
}
export default SignUpForm