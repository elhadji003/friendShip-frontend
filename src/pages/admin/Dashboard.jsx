import React from 'react';
import { useGetAllUsersQuery } from '../../features/users/userAPI';
import { FaUser } from 'react-icons/fa';

const UserList = () => {
    const { data: users, error, isLoading } = useGetAllUsersQuery();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div className="text-red-500">Erreur: {error.message}</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Liste des utilisateurs</h1>
            <table className="min-w-full text-center table-auto border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="border-b border-gray-300 px-4 py-2">Profile</th>
                        <th className="border-b border-gray-300 px-4 py-2">Nom</th>
                        <th className="border-b border-gray-300 px-4 py-2">Email</th>
                        <th className="border-b border-gray-300 px-4 py-2">Rôle</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {users && users.map((user) => (
                        <tr key={user.id}>
                            <td className="border-b border-gray-300 px-4 py-2">
                                <FaUser />
                            </td>
                            <td className="border-b border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{user.is_connected
                                ? <span className="text-green-500">en ligne</span>
                                : <span className="text-red-500">Déconnecté</span>
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
