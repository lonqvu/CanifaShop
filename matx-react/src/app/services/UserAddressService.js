import http from "./http-common";
const URL_USER = "/user/address";
class UserService {
    getAddressByUsername(username){
        return http.get(URL_USER + "/list/"+username)
    }
    

}
export default new UserService();