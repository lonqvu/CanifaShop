package com.rikkeisoft.canifashop.presentation.controller.admin;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BasePagerData;
import com.rikkeisoft.canifashop.presentation.response.OrderResponse;
import com.rikkeisoft.canifashop.presentation.response.RevenueByResponse;
import com.rikkeisoft.canifashop.presentation.response.statisticalReponse;
import com.rikkeisoft.canifashop.repository.ColorRepository;
import com.rikkeisoft.canifashop.repository.OrderRepository;
import com.rikkeisoft.canifashop.repository.ProductRepository;
import com.rikkeisoft.canifashop.repository.UserRepository;
import com.rikkeisoft.canifashop.service.OrderService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequiredArgsConstructor
@RequestMapping("${base.api}/admin/home")
public class HomeAdminController extends BaseController {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;
    @GetMapping("/users")
    public ResponseEntity<?> getCountUser(){
       return ResponseEntity.ok(userRepository.countUsers());
    }
    @GetMapping("/products")
    public ResponseEntity<?> getCountProduct(){
        return ResponseEntity.ok(productRepository.countProducts());
    }
    @GetMapping("/orders")
    public ResponseEntity<?> getCountOrders(){
        return ResponseEntity.ok(orderRepository.countOrders());
    }

    @GetMapping("/getRevenueByYear")
    public ResponseEntity<List<statisticalReponse>> getRevenueByYear (@RequestParam("year") Integer year){
        List<statisticalReponse> list = orderService.getRevenueByYear(year);
        return ResponseEntity.ok(orderService.getRevenueByYear(year));
    }

    @GetMapping("/getRevenueByProduct")
    public ResponseEntity<List<statisticalReponse>> getRevenueByProduct(@RequestParam("year") Integer year, @RequestParam("name") String name){
        List<statisticalReponse> list = orderService.getRevenueByProduct(year,name);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/getOrderByMonth")
	public ResponseEntity<BasePagerData<OrderResponse>> getOrderByYear(
			@RequestParam(name = "page", defaultValue = "0") Integer page,
			@RequestParam("year") Integer year,
            @RequestParam("month") Integer month){
		return ResponseEntity.ok(orderService.getOrderByMonth(page, PAGE_SIZE, year, month));
	}
    @GetMapping("/getOrderByTop5")
    public ResponseEntity<List<RevenueByResponse>> getOrderByTop5(@RequestParam("startDate") Long startDate,
                                                                  @RequestParam("endDate") Long endDate){
        List<RevenueByResponse> list = orderService.RevenueByTop5(startDate, endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getRevenueByTop5Cate")
    public ResponseEntity<List<RevenueByResponse>> getRevenueByTop5Cate(@RequestParam("startDate") Long startDate,
                                                                  @RequestParam("endDate") Long endDate){
        List<RevenueByResponse> list = orderService.RevenueByTop5Cate(startDate, endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getRevenueByTop10User")
    public ResponseEntity<List<RevenueByResponse>> getRevenueByTop10User(@RequestParam("startDate") Long startDate,
                                                                        @RequestParam("endDate") Long endDate){
        List<RevenueByResponse> list = orderService.RevenueByTop10User(startDate, endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getOrderByQuantity")
    public ResponseEntity<List<RevenueByResponse>> getOrderByQuantity(@RequestParam("startDate") Long startDate,
                                                                  @RequestParam("endDate") Long endDate){
        List<RevenueByResponse> list = orderService.RevenueByQuantity(startDate, endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getRevenueByCate/{id}")
    public ResponseEntity<List<RevenueByResponse>> getOrderByCate(@RequestParam("startDate") Long startDate,
                                                                  @RequestParam("endDate") Long endDate,
                                                                  @PathVariable("id") Long id){
        List<RevenueByResponse> list = orderService.RevenueByCate(startDate, endDate, id);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getRevenueByReturn")
    public ResponseEntity<List<RevenueByResponse>> getOrderByCate(@RequestParam("startDate") Long startDate,
                                                                  @RequestParam("endDate") Long endDate
                                                                  ){
        List<RevenueByResponse> list = orderService.RevenueByReturn(startDate, endDate);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/getCountCancel")
    public ResponseEntity<?> getCountCancel(@RequestParam("status") String status,
                                            @RequestParam("startDate") Long startDate,
                                            @RequestParam("endDate") Long endDate){

        return ResponseEntity.ok(orderService.Return(status,startDate, endDate));
    }

    @GetMapping("/getRevenueByComplete")
    public ResponseEntity<List<RevenueByResponse>> getOrderByComplete(@RequestParam("startDate") Long startDate,
                                                                  @RequestParam("endDate") Long endDate
    ){
        List<RevenueByResponse> list = orderService.RevenueByQuantityOrderComplete(startDate, endDate);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/getRevenueByCancel")
    public ResponseEntity<List<RevenueByResponse>> getOrderByCancel(@RequestParam("startDate") Long startDate,
                                                                      @RequestParam("endDate") Long endDate
    ){
        List<RevenueByResponse> list = orderService.RevenueByQuantityOrderCancel(startDate, endDate);
        return ResponseEntity.ok(list);
    }
}
