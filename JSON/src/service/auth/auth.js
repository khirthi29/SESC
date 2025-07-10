import StudentPortalService from "../axios/axios";

class AuthService {

    // generateOTP(data) {
    //     return Promise.resolve(StudentPortalService.post('genotpli', data));
    // }

    signIn(data) {
        return Promise.resolve(StudentPortalService.post('api/v1/auth/login', data));
    }

    getUser(data) {
        debugger;
        return Promise.resolve(StudentPortalService.post('auth/getUser', data));
    }
    
}

export default AuthService;