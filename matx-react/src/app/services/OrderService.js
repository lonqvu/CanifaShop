import http from "./http-common";
const URL_ADMIN = "/admin/orders";
const URL_CART = "/user/cart";
const URL_STAFF = "/staff/orders";
const URL_GUEST = "/guest/cart"

 class OrderService {
     getOrdersPagingAdmin(page,keyword){
         return http.get(URL_ADMIN+"?page="+page+"&keyword="+keyword);
     }
     getAllOrdersAdmin(){
         return http.get(URL_ADMIN );    
     }
     getOrderByIdAdmin(orderId){
         return http.get(URL_ADMIN + "/"+ orderId);
     }
     updateStatusAdmin(orderId, orders){
         return http.put(URL_ADMIN +"/" + orderId+"?orderStatus="+ orders);
     }
     createOrder(orders){
        return http.post(URL_CART,orders);
    }
    createOrderGuest(orders){
        return http.post(URL_GUEST,orders);
    }

    getOrdersPagingStaff(page,keyword){
        return http.get(URL_STAFF+"?page="+page+"&keyword="+keyword);
    }
    getAllOrdersStaff(){
        return http.get(URL_STAFF );    
    }
    getOrderByIdStaff(orderId){
        return http.get(URL_STAFF + "/"+ orderId);
    }
    updateStatusStaff(orderId, orders){
        return http.put(URL_STAFF +"/" + orderId+"?orderStatus="+ orders);
    }
   
     
 }
  export default new OrderService();
 
