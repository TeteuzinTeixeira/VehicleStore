'use client'

import React, { useState } from 'react';
import styles from './save-user.module.css';
import UserService from '../services/userService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import LoadingOverlay from '../components/LoadingOverlay';

type DataInput = {
    email: string;
    password: string;
};

interface Credenciais {
    email: string;
    password: string;
}

const SaveUserPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const usuarioService = new UserService();

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
    
            await usuarioService.salvar(credenciais);
            toast.success('Cadastro efetuado com sucesso 😀!');
            reset();
        } catch (error: any) {
            let errorMessage = 'Erro ao fazer cadastro 😒';

            if (error.response && error.response.data) {
                const responseErrors = error.response.data.errors;
                if (Array.isArray(responseErrors)) {
                    errorMessage = responseErrors.join(', ');
                } else if (typeof responseErrors === 'object') {
                    errorMessage = Object.values(responseErrors).flat().join(', ');
                }
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <div className={styles.loginTitleBox}>
                    <h1>Cadastre-se</h1>
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

                        <div className={styles.loginButtonBox}>
                            <button type="submit" disabled={loading}>
                                Cadastrar
                            </button>
                        </div>
                        <Link href="/login" className={styles.login}>Possui usuario? Efetue login</Link>
                    </form>
                </div>
            </div>

            {loading && <LoadingOverlay />}
        </div>
    );
};

export default SaveUserPage;
