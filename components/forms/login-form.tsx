'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  return <form className="space-y-4" onSubmit={handleSubmit(async (data) => {
    await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    router.push('/dashboard');
  })}>
    <input className="block w-full px-4 py-2 mt-2 border rounded-md" placeholder="example@example.com" {...register('email')} />
    <input type="password" className="block w-full px-4 py-2 mt-2 border rounded-md" placeholder="Your Password" {...register('password')} />
    <button className="w-full px-4 py-2 tracking-wide text-white bg-blue-500 rounded-md">Sign in</button>
  </form>;
}
