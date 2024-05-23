import React, { createContext, useContext, useState } from 'react';
import { Vehicle } from '../services/RentService';

type RentDetails = {
  startDate: string;
  endDate: string;
  rentedVehicle: Vehicle | null;
};

type RentContextType = {
  rentDetails: RentDetails | null;
  setRentDetails: (details: RentDetails) => void;
};

const RentContext = createContext<RentContextType | undefined>(undefined);

export const useRentContext = () => {
  const context = useContext(RentContext);
  if (!context) {
    throw new Error('useRentContext debe usarse dentro de un proveedor RentProvider');
  }
  return context;
};

type RentProviderProps = {
  children: React.ReactNode;
};

export const RentProvider: React.FC<RentProviderProps> = ({ children }) => {
  const [rentDetails, setRentDetails] = useState<RentDetails | null>(null);

  return (
    <RentContext.Provider value={{ rentDetails, setRentDetails }}>
      {children}
    </RentContext.Provider>
  );
};
