const AUTH_API_URL = 'http://192.168.0.21:8000/api/v1/auth';
const LOGIN_PATH = '/login';
const REGISTER_PATH = '/register';
const CLIENTS_PATH = '/cliente'

interface User {
    DNI: string;
    Nombre: string;
    Apellidos: string;
    email: string;
    password: string;
    Saldo: number;
    InicioAlquiler: string;
    FinAlquiler: string;
    MatriculaAlq: string
}

interface ApiResponse<T> {
    message: string;
    user: T;
}

const getInitRequest = (httpVerb: string, body: {}): RequestInit => {
    const init: RequestInit = {
        method: httpVerb,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    return init;
};

export const userRegister = async (user: User): Promise<{ httpCode: number; userData?: User }> => {
    const userRequest = {
        dni: user.DNI,
        nombre: user.Nombre,
        apellidos: user.Apellidos,
        email: user.email,
        password: user.password
    }
    const request: RequestInfo = `${AUTH_API_URL}${REGISTER_PATH}`;
    const response = await fetch(request, getInitRequest("POST", userRequest));

    let httpCode = response.status;

    if (httpCode === 201 || httpCode === 200) {
        const data: ApiResponse<User> = await response.json();
        return { httpCode, userData: data.user };
    }

    return { httpCode };
};

export const userLogin = async (user: {}): Promise<{ httpCode: number; userData?: User }> => {
    const request: RequestInfo = `${AUTH_API_URL}${LOGIN_PATH}`;
    const response = await fetch(request, getInitRequest("POST", user));

    let httpCode = response.status;

    if (httpCode === 200) {
        const data: ApiResponse<User> = await response.json();
        return { httpCode, userData: data.user };
    }

    return { httpCode };
};

interface ClientData {
    dni: string;
    nombre: string;
    apellidos: string;
    email: string;
    saldo: number;
    inicioAlquiler: string | null;
    finAlquiler: string | null;
    matriculaAlq: string | null;
}

export const getClientByDNI = async (dni: string | undefined): Promise<{ httpCode: number; clientData?: ClientData }> => {
    const request: RequestInfo = `http://192.168.0.21:8000/api/v1/rentacartf/cliente/${dni}`;
    const response = await fetch(request);
    
    const httpCode = response.status;

    if (httpCode === 200) {
        const responseData = await response.json();
        const clientDataArray = responseData.data;
        if (clientDataArray && clientDataArray.length > 0) {
            const clientData = clientDataArray[0];
            return { httpCode, clientData };
        } else {
            return { httpCode };
        }
    }

    return { httpCode };
};
