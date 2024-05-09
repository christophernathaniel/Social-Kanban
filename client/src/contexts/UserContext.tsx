// UserContext.tsx
import React, { createContext, useContext } from 'react';

interface UserContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserProvider: React.FC<UserProviderProps> = ({ user, setUser, children }) => {
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};