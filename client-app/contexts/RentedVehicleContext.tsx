import React, { createContext, useContext } from 'react';
import { Vehicle } from '../services/RentService';

export type RentedVehicleContextType = {
  rentedVehicleData: Vehicle[];
  setRentedVehicleData: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  selectedRentedVehicle: Vehicle | null;
  setSelectedRentedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
  getVehicleData: () => Promise<void>;
};

export const RentedVehicleContext = createContext<RentedVehicleContextType | undefined>(undefined);

export const useRentedVehicleContext = (): RentedVehicleContextType => {
  const context = useContext(RentedVehicleContext);
  if (!context) {
    throw new Error('useRentedVehicleContext debe usarse dentro de un proveedor VehicleContext');
  }
  return context;
};
