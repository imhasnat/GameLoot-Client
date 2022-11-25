import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import Loading from '../../Pages/Shared/Loading';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser);
        })

        return () => unsubscribe();
    }, [])

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = userinfo => {
        return updateProfile(auth.currentUser, userinfo)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginPopup = provider => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logout = () => {
        setLoading(true);
        localStorage.removeItem('accessToken');
        return signOut(auth);
    }

    if (loading) {
        return <Loading></Loading>;
    }

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        updateUser,
        login,
        loginPopup,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;