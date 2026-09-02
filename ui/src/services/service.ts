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

export const publicJobsList = async () => {
    const res = await axios.get(`${baseUrl}/api/jobs`);
    return res?.data
}
export const adminPostedJobsList = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/admin-posted-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const seekerApplyJob = async (data: any, token: any) => {
    const res = await axios.post(`${baseUrl}/api/seeker-apply-job`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const seekerDashboardApi = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/seeker-dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const recruiterDashboardApi = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/recruiter-dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const adminDashboardApi = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/admin-dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const adminSeekerListApi = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/admin-seeker-list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}
export const adminRecruiterListApi = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/admin-recruiter-list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}

export const adminAppliedJobListApi = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/admin-applied-job`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}

export const seekerAppliedJob = async (data:any,token: any) => {
    const res = await axios.post(`${baseUrl}/api/seeker-applied-job`,data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}

export const getseekerAppliedJobList = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/seeker-applied-job`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}

export const getrecruterAppliedJobList = async (token: any) => {
    const res = await axios.get(`${baseUrl}/api/recruiter-applied-job`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data
}

export const updateRecruiterAppliedJobStatus = async (
    appliedId: string | number,
    status: 'hired' | 'rejected' | 'pending',
    token: any,
) => {
    const res = await axios.patch(
        `${baseUrl}/api/recruiter-applied-job/${appliedId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return res?.data
}
