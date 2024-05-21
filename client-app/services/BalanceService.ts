const RENT_API_URL = 'http://192.168.0.21:8000/api/v1/rentacartf';
const UPDATE_BALANCE_PATH = '/clientes';

interface ApiResponse<T> {
    statusCode: number;
    statusMessage: string;
    message: string;
    data: T;
}

const getInitRequest = (httpVerb: string, body: {}): RequestInit => {
    return {
        method: httpVerb,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
};

export const updateBalance = async (dni: string, saldo: number): Promise<{ httpCode: number; message: string; data?: any }> => {
    const request: RequestInfo = `${RENT_API_URL}${UPDATE_BALANCE_PATH}`;
    const body = { dni, Saldo: saldo };
    const response = await fetch(request, getInitRequest("PUT", body));

    const httpCode = response.status;
    if (httpCode === 200 || httpCode === 201) {
        const data: ApiResponse<any> = await response.json();
        return { httpCode: data.statusCode, message: data.message, data: data.data };
    } else {
        const errorResponse = await response.text();
        console.error('Error al actualizar el saldo:', errorResponse);
        return { httpCode, message: 'No se pudo actualizar el saldo' };
    }
};
