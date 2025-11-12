import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token"); // ✅ lowercase 'l'
        const userData = localStorage.getItem("user"); // ✅ lowercase 'l'
        
        if(token && userData){
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => { // ✅ lowercase 'l'
        setUser(userData);
        localStorage.setItem("token", token); // ✅ lowercase 'l'
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ lowercase 'l'
    }

    const logout = () => { // ✅ lowercase 'l'
        setUser(null);
        localStorage.removeItem("user"); // ✅ lowercase 'l'
        localStorage.removeItem("token"); // ✅ lowercase 'l'
    }

    const value = {
        user, 
        login, // ✅ lowercase - function name match karega
        logout, // ✅ lowercase - function name match karega  
        loading // ✅ lowercase - variable name match karega
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}