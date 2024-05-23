import React, { useState } from 'react';
import { RentedVehicleContext, RentedVehicleContextType } from '../contexts/RentedVehicleContext';
import { Vehicle, getVehicleData } from '../services/RentService';

type RentedVehicleProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const RentedVehicleProvider = (props: RentedVehicleProviderProps) => {
  const { children } = props;

  const [rentedVehicleData, setRentedVehicleData] = useState<Vehicle[]>([]);
  const [selectedRentedVehicle, setSelectedRentedVehicle] = useState<Vehicle | null>(null);

  const fetchVehicleData = async () => {
    try {
      const data = await getVehicleData();
      setRentedVehicleData(data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const defaultValue: RentedVehicleContextType = {
    rentedVehicleData: rentedVehicleData,
    setRentedVehicleData: setRentedVehicleData,
    selectedRentedVehicle: selectedRentedVehicle,
    setSelectedRentedVehicle: setSelectedRentedVehicle,
    getVehicleData: fetchVehicleData,
  };

  return (
    <RentedVehicleContext.Provider value={defaultValue}>
      {children}
    </RentedVehicleContext.Provider>
  );
};

export default RentedVehicleProvider;
