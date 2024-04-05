export class Api {
    static baseUrl = "http://127.0.0.1:8000/api";

    static async post<T>(url: string, data: any): Promise<any> {
        try {
            const response = await fetch(Api.baseUrl + url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const dataResponse = await response.json();

            return {
                statusCode: response.status,
                data: dataResponse,
            };
        } catch (error) {
            
            console.error("Error al realizar la solicitud:", error);
            return {
                statusCode: 500,
                data: null,
            };
        }
    }
}
