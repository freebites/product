import {
  Redirect,
  router,
  useLocalSearchParams,
  useSegments,
} from "expo-router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { registerForPushNotificationsAsync } from "../components/notifications/useNotifications";
import { getOneUser, updateUser } from "../api/user/usercrud";

const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function validateRoutePerms() {
  const { user } = useAuth();
  const routeParams = useLocalSearchParams();
  if (
    user === undefined ||
    user === null ||
    user.uid === null ||
    user.uid !== routeParams.id
  ) {
    return <Redirect href="/login" />;
  }
}
export function useProtectedRoute(user) {
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
    // firebase sign in function
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setAuth(user);

        //Get Device Speicific Token and update the user's tokens
        const newExpoToken = await registerForPushNotificationsAsync();
        const mongoUser = await getOneUser(user.uid);
        const { expoToken, ...other } = mongoUser;
        if (mongoUser.expoToken !== newExpoToken.data) {
          await updateUser({
            userID: user.uid,
            user: { ...other, expoToken: newExpoToken.data },
          });
        }
      })
      .catch((error) => {
        console.log("error signing in: ", error);
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        // sign out of firebase
        // remove user from the app's local context
        setAuth(null);
      })
      .catch((error) => {
        console.log("error signing out: ", error);
      });
  };
  // function that tracks whether a user is already signed in or not
  // and signs in automatically if true.
  React.useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setAuth(authUser);
    });
  }, []);

  useProtectedRoute(user);
  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
