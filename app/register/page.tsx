import RegisterForm from '@/components/forms/register-form';

export default function RegisterPage() {
  return <div className="bg-white"><div className="flex justify-center h-screen"><div className="flex items-center w-full max-w-md px-6 mx-auto"><div className="flex-1"><div className="text-center"><h2 className="text-4xl font-bold text-gray-700">Brand</h2><p className="mt-3 text-gray-500">Sign up to create account</p></div><div className="mt-8"><RegisterForm /></div></div></div></div></div>;
}
