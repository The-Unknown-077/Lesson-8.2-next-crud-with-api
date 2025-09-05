"use client"
import Link from 'next/link';
import { FC, memo } from 'react';

interface iStudents {
    id?: number;
    first_name?: string;
    last_name?: string;
    gender?: string;
    region?: string;
}

interface Props {
    data: iStudents[];
    api: string
}


const UserView: FC<Props> = ({ data, api }) => {

    const handleDelete = async (id: any) => {
        await fetch(`${api}/${id}`, {
            method: 'DELETE',
        });
    }

    return (
        <div className="UserView container mx-auto px-4 py-6 w-full">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((item) => (
                    <li
                        key={item.id}
                        className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-xl transition duration-300 flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <p className="text-lg font-semibold text-gray-700">
                                {item.first_name} {item.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Gender:</span> {item.gender}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Region:</span> {item.region}
                            </p>
                        </div>
                        <div className="flex justify-center items-center gap-[3px] mt-[12px]">
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
                            >
                                Delete
                            </button>
                            <button>
                                <Link
                                    href={`/create?id=${item.id}`}
                                    className="px-4 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                                >
                                    Update
                                </Link>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(UserView);