import LoginForm from '@/components/forms/login-form';

export default function LoginPage() {
  return <div className="bg-white"><div className="flex justify-center h-screen"><div className="flex items-center w-full max-w-md px-6 mx-auto"><div className="flex-1"><div className="text-center"><h2 className="text-4xl font-bold text-gray-700">Brand</h2><p className="mt-3 text-gray-500">Sign in to access your account</p></div><div className="mt-8"><LoginForm /></div></div></div></div></div>;
}
