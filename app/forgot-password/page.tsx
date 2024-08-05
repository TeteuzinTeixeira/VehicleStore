'use client'

import React, { useState } from 'react';
import styles from './forgotPassword.module.css';
import UserService from '../services/userService';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import LoadingOverlay from '../components/LoadingOverlay';

const SaveUserPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    interface DataInput {
        email: string;
    }

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
            const email: string = data.email;
    
            await usuarioService.forgotPassword(email);
            toast.success('Email enviado com sucesso com sucesso 😀!');
            reset();
        } catch (error: any) {
            let errorMessage = 'Erro ao fenviar e-mail 😒';

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
                    <h1>Esqueci minha senha</h1>
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
                        </div>

                        <div className={styles.loginButtonBox}>
                            <button type="submit" disabled={loading}>
                                Enviar email
                            </button>
                        </div>
                        <Link href="/login" className={styles.login}>Voltar ao login</Link>
                    </form>
                </div>
            </div>

            {loading && <LoadingOverlay />}
        </div>
    );
};

export default SaveUserPage;
