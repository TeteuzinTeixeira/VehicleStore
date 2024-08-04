'use client'

import React, { useState } from 'react';
import styles from './login.module.css';
import UsuarioService from '../services/usuarioService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type DataInput = {
    email: string;
    password: string;
};

interface Credenciais {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const usuarioService = new UsuarioService();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DataInput>();

    const onSubmit = async (data: DataInput) => {
        setLoading(true);
    
        try {
            const credenciais: Credenciais = {
                email: data.email,
                password: data.password,
            };
    
            await usuarioService.login(credenciais);
            toast.success('Login efetuado com sucesso 😀!');
            reset();
        } catch (error: any) {
            toast.error('Email ou senha invalidos 😒')
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <div className={styles.loginTitleBox}>
                    <h1>Login</h1>
                </div>

                <div className={styles.loginFormContainer}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.loginFormInputContainer}>
                            <div className={styles.loginFormBox}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="Digite seu email"
                                />
                                {errors.email && <p className={styles.errorMessage}>O campo email é obrigatório</p>}
                            </div>

                            <div className={styles.loginFormBox}>
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="password"
                                    {...register("password", { required: true })}
                                    placeholder="Digite sua senha"
                                />
                                {errors.password && <p className={styles.errorMessage}>O campo senha é obrigatório</p>}
                            </div>
                        </div>

                        {error && <p className={styles.errorMessage}>{error}</p>}
                        {success && <p className={styles.successMessage}>{success}</p>}

                        <div className={styles.loginButtonBox}>
                            <button type="submit" disabled={loading}>
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
