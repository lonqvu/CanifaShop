import http from "./http-common";
const URL_ADMIN = "/admin/promotions";
const URL_GUEST = "/guest/promotion";
class PromotionService{
    getPromotionsPagingAdmin(page,keyword){
        return http.get(URL_ADMIN+"?page="+page+"&keyword="+keyword);
    }
    getAllPromotionsAdmin(){
        return http.get(URL_ADMIN+"/all");
    }
    getAllPromotions(){
        return http.get(URL_GUEST+"/all");
    }
    deletePromotionAdmin(id){
        return http.delete(URL_ADMIN+"/"+id);
    }
    updatePromotionAdmin(id, promotion){
        return http.put(URL_ADMIN + "/" + id, promotion);
    }
    createPromotionAdmin(promotion){
        return http.post(URL_ADMIN, promotion);
    }
    getPromotionAdminById(id){
        return http.get(URL_ADMIN + "/"+id);
    }

    createAvatar(id, avatar) {
        let formData = new FormData();
        formData.append("avatar", avatar)
        return http.post(URL_ADMIN + '/' + 'uploadfile' + '/' + id, formData)
    }
}
export default new PromotionService();