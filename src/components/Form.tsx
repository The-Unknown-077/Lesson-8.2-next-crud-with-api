"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const schema = yup.object({
    first_name: yup.string().required("Ism majburiy"),
    last_name: yup.string().required("Familiya majburiy"),
    gender: yup.string().oneOf(["male", "female"], "Gender noto‘g‘ri").required("Gender majburiy"),
    region: yup.string().required("Region majburiy"),
})

export default function Form() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const id = searchParams.get("id")

    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (id) {
            setLoading(true)
            fetch(`https://68ad5a10a0b85b2f2cf2fa83.mockapi.io/user/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    reset(data)
                })
                .finally(() => setLoading(false))
        }
    }, [id, reset])

    const onSubmit = async (data: any) => {
        if (id) {
            const res = await fetch(`https://68ad5a10a0b85b2f2cf2fa83.mockapi.io/user/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
        } else {
            const res = await fetch("https://68ad5a10a0b85b2f2cf2fa83.mockapi.io/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
        }

        router.push("/")
    }

    if (loading) return <div className="min-h-screen w-full bg-white"></div>

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    {id ? "Foydalanuvchini yengilash" : "Yangi foydalanuvchi qoshish"}
                </h2>

                <div>
                    <input
                        {...register("first_name")}
                        placeholder="Ism"
                        className="w-full border p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                    <p className="text-red-500 text-sm">{errors.first_name?.message}</p>
                </div>

                <div>
                    <input
                        {...register("last_name")}
                        placeholder="Familiya"
                        className="w-full border p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                    <p className="text-red-500 text-sm">{errors.last_name?.message}</p>
                </div>

                <div>
                    <select
                        {...register("gender")}
                        className="w-full border p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    >
                        <option value="">Gender</option>
                        <option value="male">Erkak</option>
                        <option value="female">Ayol</option>
                    </select>
                    <p className="text-red-500 text-sm">{errors.gender?.message}</p>
                </div>

                <div>
                    <input
                        {...register("region")}
                        placeholder="Region"
                        className="w-full border p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                    <p className="text-red-500 text-sm">{errors.region?.message}</p>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition"
                >
                    {id ? "Yangilash" : "Yuborish"}
                </button>
            </form>
        </div>
    )
}
