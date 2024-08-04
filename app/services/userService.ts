import ApiService from './api';

interface Credenciais {
    email: string;
    password: string;
}

interface Usuario {
    email: string;
    password: string;
}

interface ResetPasswordBody {
    email: string,
    resetCode: string,
    newPassword: string
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class UserService extends ApiService {
    constructor() {
        super('')
    }

    async login(credenciais: Credenciais): Promise<any> {
        try {
            console.log(baseURL)
            return await this.post('/login?useCookies=true&useSessionCookies=true', credenciais);
        } catch (error) {
            throw new Error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    }

    salvar(usuario: Usuario): Promise<any> {
        return this.post('/register', usuario);
    }

    sendEmailConfirmation(email: string): Promise<any> {
        return this.post('/resendConfirmationEmail', email);
    }

    forgotPassword(email: string): Promise<any> {
        return this.post('/forgotPassword', email)
    }

    resetPassword(resetPasswordBody: ResetPasswordBody): Promise<any> {
        return this.post('/forgotPassword', this.resetPassword)
    }
}

export default UserService;
