import axios from "axios";
import React from "react";

const api = axios.create({
    baseURL: "https://bulksy.in",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})



export default api