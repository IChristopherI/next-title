'use client'

import { useAuthStore } from "@/features/auth/components/Auth";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const login = useAuthStore((state) => state.login);


    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
            try {
             await login({ email, password });
             router.push('/');
         } catch (err) {
              console.log(err);
             setError('Неверная почта или пароль');
    }
  }


    const inputClass =
        "peer w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 pb-2 pt-6 text-sm text-white outline-none transition placeholder:text-transparent focus:border-red-500 focus:bg-white/[0.07]";

    const labelClass =
        "absolute left-4 top-2 text-xs text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-red-400";

    return (
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Вход
                    </h1>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative">
                        <input
                            className={inputClass}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder=""
                            required
                        />
                        <label className={labelClass}>Email</label>
                    </div>

                    <div className="relative">
                        <input
                            className={inputClass}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder=""
                            required
                        />
                        <label className={labelClass}>Password</label>
                    </div>
                    {error && (
                        <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </p>
                    )}
                    <Button
                        className="h-12 w-full rounded-lg bg-red-600 text-base font-semibold text-white hover:bg-red-500"
                        type="submit"
                    >
                        Вход
                    </Button>

                    <p className="text-center text-sm  text-zinc-400">
                        Нет аккаунта?

                        <a href="/registration" className="text-red-400 hover:text-red-300 ml-1">
                            Регистрация
                        </a>
                    </p>
                </form>                             
            </div>
        </section>
    )
}