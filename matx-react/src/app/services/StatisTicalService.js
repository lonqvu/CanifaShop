import http from "./http-common";
const URL_BASE = "/admin/home";
const URL_BASES = "/admin/orders";
class HomeService{
    getUserSum(name){
        return http.get(URL_BASE+"/"+name);
    }
    getYear(year){
        return http.get(URL_BASE+"/getRevenueByYear?year="+year);
    }

    getOrderByMonth(page, year, month){
        return http.get(URL_BASE +"/getOrderByMonth"+"?page="+page+"&year="+year+"&month="+month);
    }
    getRevenueTop5Product(startTime, endTime){
        return http.get(URL_BASE+"/getOrderByTop5?startDate="+startTime+"&endDate="+endTime);
    }
    getRevenueTop5Cate(startTime, endTime){
        return http.get(URL_BASE+"/getRevenueByTop5Cate?startDate="+startTime+"&endDate="+endTime);
    }
    getRevenueByQuantity(startTime, endTime){
        return http.get(URL_BASE+"/getOrderByQuantity?startDate="+startTime+"&endDate="+endTime);
    }

    getRevenueByCate(startTime, endTime, parenId){
        return http.get(URL_BASE+"/getRevenueByCate/"+parenId+"?startDate="+startTime+"&endDate="+endTime);
    }

    getRevenueTop10User(startTime, endTime){
        return http.get(URL_BASE+"/getRevenueByTop10User?startDate="+startTime+"&endDate="+endTime);
    }

    getRevenueByComplete(startTime, endTime){
        return http.get(URL_BASE+"/getRevenueByComplete?startDate="+startTime+"&endDate="+endTime);
    }

    getRevenueByCancel(startTime, endTime){
        return http.get(URL_BASE+"/getRevenueByCancel?startDate="+startTime+"&endDate="+endTime);
    }

    getCount(startTime, endTime, status){
        return http.get(URL_BASE+"/getCountCancel?startDate="+startTime+"&endDate="+endTime+"&status="+status);
    }
    
}
export default new HomeService();