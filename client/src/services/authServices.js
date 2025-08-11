export const loginUser = async (email,password) => {
    console.log("loginUser");

    return await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({email,password})
    }).then(async res => await res.json())
}


export const createAccount = async(name,email,password,phone) => {
    return await fetch("http://localhost:3000/api/v1/auth/createAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({name,email,password,phone})
    }).then(async res => await res.json())
}