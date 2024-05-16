const API_URL = 'http://172.16.100.232:8000/api/v1/rentacartf';
const VEHICLES_PATH = '/vehiculos';

type VehicleJsonResponse = {
    statusCode: number;
    statusMessage: string;
    message: string;
    data: VehicleData;
}

type VehicleData = Vehicle[];

export type Vehicle = {
    MatriculaCar: string;
    Fabricante: string;
    Modelo: string;
    Motorizacion: string;
    Antigüedad: number;
    Alquilado: number;
    EnMantenimiento: number;
    Descripcion: string;
    TipoVehiculo: string;
    PrecioDia: number;
}

const getInitRequest = (httpVerb: string): RequestInit => {
    const init: RequestInit = {
      method: httpVerb,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    return init;
  }

export const getVehicleData = async (): Promise<VehicleData> => {
  let vehicleData: VehicleData = [];

  const request: RequestInfo = `${API_URL}${VEHICLES_PATH}`;
  const response = await fetch(request, getInitRequest('GET'));
  const json: VehicleJsonResponse = await response.json();

  if (json != null) {
    vehicleData = json.data;
  }

  return vehicleData;
}
