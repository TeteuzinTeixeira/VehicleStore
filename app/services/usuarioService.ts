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
            return await this.post('/login', credenciais);
        } catch (error) {
            throw new Error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    }

    salvar(usuario: Usuario): Promise<any> {
        return this.post('/', usuario);
    }

    validar(usuario: Usuario): void {
        const erros: string[] = [];

        if (!usuario.email) {
            erros.push('O campo Email é obrigatório.');
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um Email válido.');
        }

        if (!usuario.password) {
            erros.push('O campo password é obrigatório.');
        }

        if (erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;
