import { db } from '@/lib/db';
import EditUserForm from '@/components/forms/edit-user-form';

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return <div>User not found</div>;
  return <div className="p-4 max-w-md"><h3 className="text-2xl font-bold mb-4">Update Record</h3><EditUserForm user={user} /></div>;
}
