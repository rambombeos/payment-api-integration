import axios from "axios";


export const fetchUser = async (userEmail: string) => {
    try {
        const res = await axios.get(`/api/payments?userEmail=${userEmail}`);
        if (res.status !== 200) {
            throw new Error("User not found");
        }
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
}


export const payment = async (userEmail: string, amount: number) => {
    try {
        const res = await axios.post(`/api/payments`, { userEmail, amount });
        if (res.status !== 200) {
            throw new Error("Error processing payment");
        }
        return res.data;
    } catch (error) {
        throw new Error("Payment failed");
    }
}