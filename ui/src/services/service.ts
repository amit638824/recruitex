import axios from "axios";
const baseUrl = 'http://localhost:9000';
export const userLogin = async (data: any) => {
    const res = await axios.post(`${baseUrl}/api/login`, data);
    return res?.data
}
export const updateProfile = async (data: any) => {
    const res = await axios.post(`${baseUrl}/api/update-profile`, data);
    return res?.data
}
export const recruiterJobPost = async (data: any, token: any) => {
    const res = await axios.post(`${baseUrl}/api/recruiter-job-post`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const recruiterPostedJobs = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/recruiter-posted-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
