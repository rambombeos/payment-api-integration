
import { NextResponse } from "next/server";

const mockUsers = [
    { id: 1, name: "Alice", email: "alice@example.com", balance: 100 },
    { id: 2, name: "Bob", email: "bob@example.com", balance: 50 },
    { id: 3, name: "Charlie", email: "charlie@example.com", balance: 200 },
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
   
    if (!userEmail) {
        return NextResponse.json({"message": "Please provide user email"}, { status: 400 });
    }
    const user = mockUsers.find((u) => u.email === userEmail);
    
    if (!user) {
        return NextResponse.json({"message": "User not found."}, { status: 404 });
    }

    return NextResponse.json({
        name: user.name,
        email: user.email,
        balance: user.balance,
    });
}

export async function POST(req: Request) {
    const { userEmail, amount } = await req.json();
    const user = mockUsers.find((u) => u.email === userEmail);
    if (!user) {
        return NextResponse.json({"message": "User not found."}, { status: 404 });
    }

    user.balance -= amount; 
    return NextResponse.json({
        message: "Payment successful",
        newBalance: user.balance,
        isPaid: user.balance <= 0 ,
    });
}