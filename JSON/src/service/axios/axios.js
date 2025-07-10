import axios from "axios";

const StudentPortalService = axios.create({

baseURL: "http://localhost:8080/",
    timeout: 60000,
    headers: {
        "Content-type": "application/json"
    }
});

export default StudentPortalService;