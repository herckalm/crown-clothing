import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utilities/firebase/firebase.util"

const SignIn = () => {
	const logGoogleUser = async () => {
		const {user} = await signInWithGooglePopup();
		createUserDocumentFromAuth(user)
	}
	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In with Google Account</button>
		</div>
	
	)
}

export default SignIn 
