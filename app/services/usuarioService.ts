import ApiService from './api';

interface Credenciais {
    email: string;
    password: string;
}

interface Usuario {
    email: string;
    password: string;
}

class ErroValidacao extends Error {
    public erros: string[];

    constructor(erros: string[]) {
        super("Erro de validação");
        this.erros = erros;
    }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class UsuarioService extends ApiService {
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
}

export default UsuarioService;
