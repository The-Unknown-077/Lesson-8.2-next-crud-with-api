"use client"

import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/">
                    <h1 className="text-xl font-bold text-gray-700">Users</h1>
                </Link>
                <nav>
                    <Link
                        href="/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add
                    </Link>
                </nav>
            </div>
        </header>
    )
}
