import React, { useState } from 'react';
import { VehicleContext, VehicleContextType } from '../contexts/VehicleContext';
import { Vehicle, getVehicleData } from '../services/RentService';

type VehicleProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const VehicleProvider = (props: VehicleProviderProps) => {
  const { children } = props;

  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fetchVehicleData = async () => {
    try {
      const data = await getVehicleData();
      setVehicleData(data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const defaultValue: VehicleContextType = {
    vehicleData,
    setVehicleData,
    selectedVehicle,
    setSelectedVehicle,
    getVehicleData: fetchVehicleData,
  };

  return (
    <VehicleContext.Provider value={defaultValue}>
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;
