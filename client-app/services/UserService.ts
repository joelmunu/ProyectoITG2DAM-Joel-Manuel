const AUTH_API_URL = 'http://192.168.0.21:8000/api/v1/auth';
const LOGIN_PATH = '/login';
const REGISTER_PATH = '/register';

interface User {
    DNI: string;
    Nombre: string;
    Apellidos: string;
    email: string;
    password: string;
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
