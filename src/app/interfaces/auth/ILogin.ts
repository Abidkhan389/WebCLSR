export interface ILogin
{
    username:string;
    password:string;
}
export interface ILoginResponse {
    id: number;
    verificationCodeExpiration: string;
    token: string;
}
