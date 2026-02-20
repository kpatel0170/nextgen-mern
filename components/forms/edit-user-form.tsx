'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function EditUserForm({ user }: { user: any }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm({ defaultValues: { name: user.name, email: user.email, password: '' } });
  return <form className="space-y-4" onSubmit={handleSubmit(async (data) => { await fetch(`/api/users/${user.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); router.push('/users'); })}>
    <input className="border px-3 py-2 rounded w-full" {...register('name')} />
    <input className="border px-3 py-2 rounded w-full" {...register('email')} />
    <input className="border px-3 py-2 rounded w-full" type="password" {...register('password')} />
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Update User</button>
  </form>;
}
