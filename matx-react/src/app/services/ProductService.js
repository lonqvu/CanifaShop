import http from "./http-common";
const URL_ADMIN = "/admin/products";
const URL_GUEST = "/guest/products"
const URL_GUESTS = "/guest"
class ProductService {
    //Guest
    getAllProductsHot() {
        return http.get(URL_GUEST + "/hot");
    }

    getAllProductsByCate(id) {
        return http.get(URL_GUEST + "/cate/"+id);
    }

    getAllProductsBySearch(page, search, priceMin, priceMax, categoryId) {
        return http.get(URL_GUEST + "/search?page=" + page + "&search=" + search + "&priceMin=" + priceMin + "&priceMax=" + priceMax + "&categoryId=" + categoryId);
    }

    getProductBySeo(productSeo) {
        return http.get(URL_GUEST + "/detail/"+productSeo);
    }

    getComment(id, page){
        return http.get(URL_GUEST+"/comment/"+id+"/?page="+page);
    }

    //Admin
    getProductsPagingAdmin(page, keyword) {
        return http.get(URL_ADMIN + "?page=" + page + "&keyword=" + keyword);
    }

    createProduct(product) {
        return http.post(URL_ADMIN, product);
    }

    getProductById(productId) {
        return http.get(URL_ADMIN + "/" + productId);
    }

    updateProduct(productId, product) {
        return http.put(URL_ADMIN + '/' + productId, product);
    }

    deleteProduct(productId) {
        return http.delete(URL_ADMIN + '/' + productId);
    }
    createOrUpdateImage(productId, avatar, images) {
        let formData = new FormData();
        formData.append("avatar", avatar)

        if (images.length <= 0) {
            formData.append("images", images);
        } else {
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
        }
        return http.post(URL_ADMIN + '/' + 'uploadfile' + '/' + productId, formData)
    }

    createOrUpdateImageComment(commentId, images) {
        let formData = new FormData();
        if (images.length <= 0) {
            formData.append("images", images);
        } else {
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
        }
        return http.post(URL_GUEST + '/uploadfile' + '/' + commentId, formData)
    }

    createComment(productId, product){
        return http.post(URL_GUEST + "/" + productId+"/comment", product);
    }
    editComment(commentId, comment){
        return http.put(URL_GUEST + "/editComment/" + commentId, comment);
    }
    getCommentByUser(id, page){
        return http.get(URL_GUEST+"/comment/user/"+id+"/?page="+page);
    }
    createFavotite(productId, product){
        return http.post(URL_GUEST+"/" + productId, product);
    }

    getCheckFavorite(productId){
        return http.get(URL_GUEST+"/getCheck/"+productId)
    }

    getFavoriteProductByUserId(id){
        return http.get(URL_GUEST+"/getProductByUserId/"+id)
    }

    getCountProduct(id){
        return http.get(URL_GUESTS+"/countProduct/"+id)
    }

    getProductsParentBoy() {
        return http.get(URL_GUEST + "/parentBoy");
    }

}
export default new ProductService()