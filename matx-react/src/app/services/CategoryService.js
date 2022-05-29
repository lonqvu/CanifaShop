import http from "./http-common";
const URL_ADMIN = "/admin/categories";
const URL_GUEST = "/guest/categories";
const URL_STAFF = "/staff/categories";
class CategoryService {
    getCategoriesPagingAdmin(page, keyword) {
        return http.get(URL_ADMIN + "?page=" + page + "&keyword=" + keyword);
    }
    getAllCategoriesAdmin() {
        return http.get(URL_ADMIN + "/all");
    }
    deleteCategoryAdmin(id) {
        return http.delete(URL_ADMIN + "/" + id);
    }
    updateCategoryAdmin(id, category) {
        return http.put(URL_ADMIN + "/" + id, category);
    }
    createCategoryAdmin(category) {
        return http.post(URL_ADMIN, category);
    }
    getCategoryAdminById(id) {
        return http.get(URL_ADMIN + "/" + id);
    }

    getCategoryParent() {
        return http.get(URL_GUEST + "/parent");
    }

    getCategoryParentWomen() {
        return http.get(URL_GUEST + "/parentWomen");
    }
    
       
    getCategoryParentAdmin() {
        return http.get(URL_ADMIN + "/parent");
    }

    getCategoryParentStaff() {
        return http.get(URL_STAFF + "/parent");
    }

    getProductsByCategory(seo, page) {
        return http.get(URL_GUEST + "/seo/" + seo + "?page=" + page);
    }
    
    getSubCategory(seo) {
        return http.get(URL_GUEST + "/sub/" + seo);
    }

    createAvatar(id, avatar) {
        let formData = new FormData();
        formData.append("avatar", avatar)
        return http.post(URL_ADMIN + '/' + 'uploadfile' + '/' + id, formData)
    }
}
export default new CategoryService();