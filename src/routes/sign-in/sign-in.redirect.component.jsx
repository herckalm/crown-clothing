import {useEffect} from "react"
import { getRedirectResult } from "firebase/auth"
import {
	auth,
	signInWithGoogleRedirect,
	signInWithGooglePopup,
	createUserDocumentFromAuth
} from "../../utilities/firebase/firebase.util"

const SignIn = () => {

	useEffect(() => {
	        async function _getRedirectResult() {
	            const response = await getRedirectResult(auth);
	            if (response) {
					const userDocRef = await createUserDocumentFromAuth(response.user)
				}
	        }
	        _getRedirectResult();
	    }, []);

	const logGoogleUser = async () => {
		const {user} = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In with Google Account</button>
			<button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button>
		</div>
	
	)
}

export default SignIn 
