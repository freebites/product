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
import { auth } from "../../firebase";
import { useNotifications } from "@components/notifications/useNotifications";
import { getOneUser, updateUser } from "@api/user/usercrud";
import { EmptyUser, UserType } from "./userContext";

//////////
// type PostContextType = {
//   postData: postType;
//   updatePostData: (newData: Partial<postType>) => void;
//   progress: number;
//   updateProgress: (newScreen: number) => void;
// };

// export const PostContext = createContext<PostContextType>({
//   postData: EmptyPost,
//   updatePostData: () => {},
//   progress: 0,
//   updateProgress: () => {},
// });

/////////

type AuthContextType = {
  user: UserType;
  setUser: (newData: UserType) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};
const AuthContext = React.createContext<AuthContextType>({
  user: EmptyUser,
  setUser: () => {},
  signIn: async () => {},
  signOut: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function validateRoutePerms() {
  const { user } = useAuth();
  const routeParams = useLocalSearchParams();
  if (
    user == EmptyUser ||
    user === undefined ||
    user.uid === "" ||
    user.uid !== routeParams.id
  ) {
    return <Redirect href="/loginPage" />;
  }
}

export function useProtectedRoute(user: UserType) {
  let segments = useSegments(); // useSegments returns the current in-file 'url'
  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)"; // checks if current url is in (auth)
    // if user not signed in AND not looking at a login page,
    if (
      segments === undefined ||
      ((user == EmptyUser || user.uid === "") && !inAuthGroup)
    ) {
      // redirect them to the login page, hack fix to prevent infinite loop
      // user.uid = "PLACEHOLDER";
      router.replace("/login");
    } else if (user != EmptyUser && user.uid != "" && inAuthGroup) {
      router.replace("/"); // stay on apge
    }
  }, [user, segments]); // run function whenever user or segments change
}

// function to
export function Provider({ children }: any) {
  const [user, setAuth] = React.useState<UserType>(EmptyUser);
  /* login/logout/signup functions */

  const login = async (email: string, password: string) => {
    // firebase sign in function
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid; // user.uid

        //Get Device Speicific Token and update the user's tokens
        if (process.env.EXPO_PUBLIC_TEST === "production") {
          const newExpoToken = await useNotifications();
          const newMongoUser = await getOneUser(user.uid);
          const { expoToken, ...other } = newMongoUser;
          if (newExpoToken && newMongoUser.expoToken !== newExpoToken.data) {
            await updateUser({
              userID: user.uid,
              user: { ...other, expoToken: newExpoToken.data },
            });
          }
        }

        const mongoUser = await getOneUser(uid); // get user from mongoDB
        setAuth(mongoUser);
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
        setAuth(EmptyUser);
      })
      .catch((error) => {
        console.log("error signing out: ", error);
      });
  };
  // function that tracks whether a user is already signed in or not
  // and signs in automatically if true.
  React.useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setAuth({ ...user, uid: authUser ? authUser.uid : "" });
    });
  }, []);

  useProtectedRoute(user);
  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        setUser: setAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
