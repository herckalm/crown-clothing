import {
	signInWithGooglePopup,
	createUserDocumentFromAuth
} from "../../utilities/firebase/firebase.util"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

	const logGoogleUser = async () => {
		const {user} = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In with Google Account</button>
			<SignUpForm />
		</div>
	)
}

export default SignIn 
