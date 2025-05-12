"use client";
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { payment } from './utils/axios';


export default function Home() {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isPaid, setIsPaid] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [amount, setAmount] = useState<number>(0);

    const fetchUser = async () => {
        try {
            const response = await fetch(`/api/payments?userEmail=${userEmail}`);
            if (!response.ok) {
                setCurrentUser(null);
                setIsPaid(false);
            }
            const data = await response.json();
            setCurrentUser(data);
        } catch (error) {
            setCurrentUser(null);
            setIsPaid(false);
            throw new Error('Failed to fetch user');
        }
    };


    const mutation = useMutation({
        mutationFn: async () => {
            const response = await payment(userEmail, amount);
            return response;
        },
        onSuccess: () => {
            setIsPaid(true);
            fetchUser();
            alert("Payment successful!");
        },
        onError: (error) => {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        },
    });

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount > 0) {
            mutation.mutate();
        } else {
            alert("Please enter a valid amount.");
        }
    };


    return (
        <>
            <main className="bg-white">
                <div className="container grid grid-cols-12 gap-4 max-w-full">
                    <div className="col-span-12 py-4 container mx-auto">
                        <div className="flex items-center justify-between w-full p-2 border-b border-gray-200">
                            <div className="flex items-center justify-left">
                                <div className="">
                                    <p className="text-2xl font-bold text-gray-800 text-center">Mock Payment Integration</p>
                                    <p className="text-sm text-h">Pay your bills with ease</p>
                                </div>

                            </div>
                        </div>
                        <div className="">
                            <div className="w-full max-w-md p-2 mt-4 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-4">
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="button"
                                    onClick={fetchUser}
                                    className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
                                >
                                    Fetch User
                                </button>
                            </div>
                            {currentUser &&
                                <div className="flex flex-col items-start justify-start w-full  my-4">
                                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-4">
                                        <div className='max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-4'>
                                            <h2 className="text-lg font-bold text-gray-800">User Details</h2>
                                            <p className="mt-2 text-sm text-gray-600">Name: {currentUser?.name}</p>
                                            <p className="mt-2 text-sm text-gray-600">Email: {currentUser?.email}</p>
                                            <p className="mt-2 text-sm text-gray-600">Balance: ${currentUser?.balance}</p>
                                            <p className="mt-2 text-sm text-gray-600">Status: {isPaid ? "Paid" : "Not Paid"}</p>
                                        </div>

                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-4 mt-4">
                                            <h2 className="text-lg font-bold text-gray-800">Payment Form</h2>
                                            <form className="mt-4" onSubmit={handlePayment}>
                                                <div className="mb-4">
                                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
                                                    <input
                                                        type="number"
                                                        id="amount"
                                                        value={amount}
                                                        onChange={(e) => setAmount(Number(e.target.value))}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                        placeholder="Enter amount to pay"
                                                        required
                                                    />
                                                </div>
                                                <button
                                                    disabled={!currentUser}
                                                    type="submit"
                                                    className={`w-full px-4 py-2 text-white rounded cursor-pointer ${!currentUser ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                                                        }`}
                                                >
                                                    Pay Now
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
