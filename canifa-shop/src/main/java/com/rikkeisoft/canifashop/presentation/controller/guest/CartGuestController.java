package com.rikkeisoft.canifashop.presentation.controller.guest;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.presentation.request.OrderRequest;
import com.rikkeisoft.canifashop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/guest/cart")
@RequiredArgsConstructor
public class CartGuestController extends BaseController {
    public final OrderService orderService;

    @PostMapping
    public ResponseEntity<BaseResponseEntity> createOrder(@RequestBody OrderRequest orderRequest) {
        return created(orderService.createOrder(orderRequest), "Create order successful");
    }
}
