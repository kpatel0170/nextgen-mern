'use client';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function UsersTable() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ['users'], queryFn: async () => (await fetch('/api/users')).json() });
  const del = useMutation({ mutationFn: async (id: string) => fetch(`/api/users/${id}`, { method: 'DELETE' }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }) });
  const users = data?.data ?? [];
  return <div className="p-4"><h3 className="text-2xl font-bold mb-4">Users</h3><div className="flex justify-end mb-4"><Link href="/register" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Create User</Link></div><table className="w-full border-collapse"><thead><tr><th className="px-4 py-2 border">Name</th><th className="px-4 py-2 border">Email</th><th className="px-4 py-2 border">Password</th><th className="px-4 py-2 border">Action</th></tr></thead><tbody>{users.map((u: any) => <tr key={u.id}><td className="px-4 py-2 border">{u.name}</td><td className="px-4 py-2 border">{u.email}</td><td className="px-4 py-2 border">{u.password}</td><td className="px-4 py-2 border"><Link href={`/edit-user/${u.id}`} className="text-blue-500 mr-2">Edit</Link><button className="text-red-500" onClick={() => del.mutate(u.id)}>Delete</button></td></tr>)}</tbody></table></div>;
}
