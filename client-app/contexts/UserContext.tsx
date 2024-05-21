import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    DNI: string;
    Nombre: string;
    Apellidos: string;
    email: string;
    Saldo?: number | null;
    InicioAlquiler?: string | null;
    FinAlquiler?: string | null;
    MatriculaAlq?: string | null;
}

interface UserContextProps {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
