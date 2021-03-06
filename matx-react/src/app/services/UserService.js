import http from "./http-common";
const URL_ADMIN = "/admin/users";
const URL_USER = "/user/profile";
const URL_CART = "/user/cart";
class UserService {
    getUsersPagingAdmin(page, keyword) {
        return http.get(URL_ADMIN + "?page=" + page + "&keyword=" + keyword);
    }
    getAllUsersAdmin() {
        return http.get(URL_ADMIN + "/all");
    }
    deleteUserAdmin(id) {
        return http.delete(URL_ADMIN + "/" + id);
    }
    lockUserAdmin(id) {
        return http.put(URL_ADMIN + "/lock/" + id);
    }
    unlockUserAdmin(id) {
        return http.put(URL_ADMIN + "/unlock/" + id);
    }
    updateUserAdmin(id, user) {
        return http.put(URL_ADMIN + "/" + id, user);
    }
    createUserAdmin(user) {
        return http.post(URL_ADMIN, user);
    }
    getUserAdminById(id) {
        return http.get(URL_ADMIN + "/" + id);
    }
    updateUser(username, user) {
        return http.put(URL_USER + "/edit" + "/" + username, user);
    }

    updatePassword(username, user) {
        return http.put(URL_USER + "/edit/password" + "/" + username, user);
    }

    getUserByUsername(username) {
        return http.get(URL_USER + "/" + username);
    }

    getOrdersByUserName(username, status) {
        return http.get(URL_CART + "/" + username + "?orderStatus=" + status);
    }

    getOrderDetailsByCode(code) {
        return http.get(URL_CART + "/detail" + "/" + code);
    }
    updateStatus(orderId, orders){
        return http.put(URL_USER +"/updateStatus/" + orderId+"?orderStatus="+ orders);
    }

    getNameRole(){
        return http.get(URL_ADMIN + "/getNameRole")
    }
    getRoleByUserId(id){
        return http.get(URL_ADMIN+"/getRoleById/"+id)
    }
    updateRole(id, name){
        return http.put(URL_ADMIN +"/updateRoles/"+id+"/?name="+name)
    }
    uploadAvatar(id, avatar){
        let formData = new FormData();
        formData.append("avatar", avatar);
        return http.post(URL_USER + '/uploadfile' + '/' +id, formData)
    }
    

}
export default new UserService();