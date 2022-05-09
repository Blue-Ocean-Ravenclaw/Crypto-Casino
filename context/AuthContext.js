import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import {
  auth
} from '../lib/firebase.js'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({
  children
}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const signup = (email, password) => (createUserWithEmailAndPassword(auth, email, password))
  const login = (email, password) => (signInWithEmailAndPassword(auth, email, password))
  const logout = (email, password) => (signOut(auth))

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscibe
  }, [])


  const value = {
    currentUser,
    signup,
    logout,
    login,
    loading
  }
  return ( <
    AuthContext.Provider value = {
      value
    } > {
      !loading && children
    } <
    /AuthContext.Provider>)
  }