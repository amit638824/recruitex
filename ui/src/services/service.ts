import axios from "axios";
const baseUrl = 'http://localhost:9000';
export const userLogin = async (data: any) => {
    const res = await axios.post(`${baseUrl}/api/login`, data);
    return res?.data
}
export const userRegister = async (data: any) => {
    const res = await axios.post(`${baseUrl}/api/register`, data);
    return res?.data
}
