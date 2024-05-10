

class ServiceToken{
    static saveToken (token: string): void  {
        localStorage.setItem('userToken', token);
    };
    
    static getToken  (): string | null {
        return localStorage.getItem('userToken');
    };
    
    static clearToken (): void {
        localStorage.removeItem('userToken');
    };
  
}

export default ServiceToken;