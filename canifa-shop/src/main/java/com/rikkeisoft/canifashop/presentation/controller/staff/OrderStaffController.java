package com.rikkeisoft.canifashop.presentation.controller.staff;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BasePagerData;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.presentation.response.OrderResponse;
import com.rikkeisoft.canifashop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/staff/orders")
@RequiredArgsConstructor
public class OrderStaffController extends BaseController {

	private final OrderService orderService;

	@GetMapping
	public ResponseEntity<BasePagerData<OrderResponse>> getOrdersByPagination(
			@RequestParam(name = "page", defaultValue = "0") Integer page,
			@RequestParam(name = "keyword", defaultValue = "-1") String keyword) {
		return ResponseEntity.ok(orderService.getOrdersByPaging(page, PAGE_SIZE, keyword));
	}

	@GetMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> getOrderById(@PathVariable Long id){
		return success(orderService.getById(id), "Get Order by successful");
	}

	@PutMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> updateStatus(@PathVariable Long id,
			@RequestParam("orderStatus") Integer orderStatus) throws MessagingException {
		return success(orderService.updateOrderStatus(id, orderStatus), "Update status order successful");
	}



}
