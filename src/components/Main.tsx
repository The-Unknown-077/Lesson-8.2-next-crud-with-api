import { memo } from 'react';
import Form from './Form';
import UserView from './UserView';

export default async function Main() {
    const api = 'https://68ad5a10a0b85b2f2cf2fa83.mockapi.io/user'
    const res = await fetch(api);
    const data = await res.json()


    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
                    Users List
                </h1>
                <UserView data={data} api={api} />
            </div>
        </div>
    );
};
