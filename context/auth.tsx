import { router, useSegments } from 'expo-router';
import React from 'react';

const AuthContext = React.createContext(null); 

export function useAuth() {
    return React.useContext(AuthContext);
}

function useProtectedRoute(user) {
    const segments = useSegments(); // useSegments returns the current in-file 'url'

    React.useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)'; // checks if current url is in (auth)

        // if user not signed in AND not looking at a login page,
        if(!user && !inAuthGroup) {
            // redirect them to the login page
            router.replace('/login');
        } else if (user && inAuthGroup) {
            router.replace('/'); // stay on apge
        }

    }, [user, segments]); // run function whenever user or segments change
}


// function to 
export function Provider(props) {
    const [user, setAuth] = React.useState(null);

    useProtectedRoute(user);

    return (
        
        <AuthContext.Provider
          value={{
            signIn: () => setAuth({}),
            signOut: () => setAuth(null),
            user,
          }}>
          {props.children}
        </AuthContext.Provider>
      );
    
}