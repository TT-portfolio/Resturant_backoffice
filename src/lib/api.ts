import { error } from "console";

// const getBaseURL = (useLocal = false) => {
//     return useLocal
//         ? process.env.NEXT_PUBLIC_API_LOCAL
//         : process.env.NEXT_PUBLIC_API_PROD;
// };
const getBaseURL = () => {
    return "https://pizzafunctions.azurewebsites.net/api"; // 🔥 Hårdkodad API-URL
    //return "http://localhost:7283/api"; // 🔥 Hårdkodad API-URL
};

export const fetchFromAPI = async ( 
    endpoint: string, 
    method: "GET"|"POST"|"PUT"|"DELETE" = "GET",
    data : any = null,
    useLocal= false,
    queryParams: Record<string, string> = {}
) => {
    const baseURL =getBaseURL();
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${baseURL}/${endpoint}${queryString ? `?${queryString}` : ''}`;
    const apiCode = !useLocal ? process.env.NEXT_PUBLIC_API_CODE : null;
    const options: RequestInit = {
        method, 
        headers: {
            "Content-Type": "application/json",
            ...(apiCode && {"x-functions-key": apiCode}),
        },
        ...(data && {body: JSON.stringify(data)}),
    };

    if(data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }catch (error){
        console.error(`API fetch Error [${method} ${endpoint}]`, error);
    }
};
