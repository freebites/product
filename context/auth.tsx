import { router, useSegments } from "expo-router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
	return React.useContext(AuthContext);
}

function useProtectedRoute(user) {
	const segments = useSegments(); // useSegments returns the current in-file 'url'

	React.useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)"; // checks if current url is in (auth)

		// if user not signed in AND not looking at a login page,
		if (!user && !inAuthGroup) {
			// redirect them to the login page
			router.replace("/login");
		} else if (user && inAuthGroup) {
			router.replace("/"); // stay on apge
		}
	}, [user, segments]); // run function whenever user or segments change
}

// function to
export function Provider(props) {
	const [user, setAuth] = React.useState(null);

	/* login/logout/signup functions */

	const login = async (email?: string, password?: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("Signed in with:", user.email);
				setAuth(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	React.useEffect(() => {
		onAuthStateChanged(auth, (authUser) => {
			console.log("Logged in with: ", authUser.email);
			setAuth(authUser);
		});
	}, []);

	useProtectedRoute(user);

	return (
		<AuthContext.Provider
			value={{
				signIn: login,
				signOut: () => setAuth(null),
				user,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
