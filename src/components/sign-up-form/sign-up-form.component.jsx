import {useState} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss"
import Button from "../button/button.component"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    // reset forms fields after creating a user
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    // the createAuthUserWithEmailAndPassword method gives back a response object
    // which contains a user object with all information about the created user 
    // apart the displayName
    // (I have to add extra functionality in the createUserDocumentFromAuth method
    // in the firebase.utils.js code) 

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
            // here I pass the displayName of the user if the form is used for
            // user creation and authentication and this value will be used
            // from the additionalInformation object in the firebase utility code

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
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handelFormSubmit}>
                <FormInput
                    label="Display Name"
                    inputOptions = {{
                        type: "text", 
                        required: true,
                        name: "displayName",
                        value: displayName,
                        onChange: handleInputChange
                    }} 
                />
                <FormInput
                    label="Email"
                    inputOptions = {{
                        type: "email",
                        required: true,
                        name: "email",
                        value: email,
                        onChange: handleInputChange
                    }}
                />
                <FormInput
                    label="Password"
                    inputOptions={{
                        type: "password",
                        required: true,
                        name: "password",
                        value: password, 
                        onChange: handleInputChange
                    }}
                />
                <FormInput
                    label="Confirm Password"
                    inputOptions = {{
                        type: "password",
                        required: true,
                        name: "confirmPassword",
                        value: confirmPassword,
                        onChange: handleInputChange
                    }}

                />

                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    )
}
export default SignUpForm