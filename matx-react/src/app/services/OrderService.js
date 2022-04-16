import http from "./http-common";
const URL_ADMIN = "/admin/orders";
const URL_CART = "/user/cart";

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
     
 }
  export default new OrderService();
 
