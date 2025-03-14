import { error } from "console";

const getBaseURL = (useLocal = false) => {
    return useLocal
        ? process.env.NEXT_PUBLIC_API_LOCAL
        : process.env.NEXT_PUBLIC_API_PROD;
};

export const fetchFromAPI = async ( 
    endpoint: string, 
    method: "GET"|"POST"|"PUT"|"DELETE" = "GET",
    data : any = null,
    useLocal= false
) => {
    const baseURL =getBaseURL(useLocal);
    console.log("Base URL:", baseURL);
    console.log("Endpoint:", endpoint);
    
    const url = `${baseURL}/${endpoint}`;
    console.log("Full URL:", url);


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
