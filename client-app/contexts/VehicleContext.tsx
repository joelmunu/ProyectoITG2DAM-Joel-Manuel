import React, { createContext, useContext } from 'react';
import { Vehicle } from '../services/RentService';

export type VehicleContextType = {
  vehicleData: Vehicle[];
  setVehicleData: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
  getVehicleData: () => Promise<void>;
};

export const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicleContext = (): VehicleContextType => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicleContext debe usarse dentro de un proveedor VehicleContext');
  }
  return context;
};
