import http from "./http-common";
const URL_USER = "/user/address";
class UserAddressService {
    getAddressByUsername(username){
        return http.get(URL_USER + "/list/"+username)
    }
    deleteAddress(id){
        return http.delete(URL_USER + "/" +id)
    }
    addAddress(address){
        return http.post(URL_USER, address)
    }
    updateAddress(address, id){
        return http.put(URL_USER+"/"+id, address)
    }
    getById(id){
        return http.get(URL_USER+"/"+id)
    }
    

}
export default new UserAddressService ();