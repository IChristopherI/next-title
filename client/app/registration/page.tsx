'use client'

import { registration } from "@/api/validation.api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

export default function Registration() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      setLoading(true);

      const response = await registration(name, email, password);

      console.log(response.data);

      setSuccess('Регистрация успешна. Проверьте почту для активации аккаунта.');

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.log(err);
      setError('Ошибка при регистрации');
    } finally {
      setLoading(false);
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
          Регистрация
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Создайте аккаунт и продолжите смотреть аниме
        </p>
      </div>

      <form onSubmit={register} className="space-y-5">
        <div className="relative">
          <input
            className={inputClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Username"
            required
          />
          <label className={labelClass}>Username</label>
        </div>

        <div className="relative">
          <input
            className={inputClass}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
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
            placeholder="Password"
            required
          />
          <label className={labelClass}>Password</label>
        </div>

        <div className="relative">
          <input
            className={inputClass}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            placeholder="Confirm password"
            required
          />
          <label className={labelClass}>Confirm password</label>
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
          Зарегистрироваться
        </Button>

        <p className="text-center text-sm  text-zinc-400">
          Уже есть аккаунт?

          <a href="/login" className="text-red-400 hover:text-red-300 ml-1">
            Войти
          </a>
        </p>
      </form>
    </div>
  </section>
);
}