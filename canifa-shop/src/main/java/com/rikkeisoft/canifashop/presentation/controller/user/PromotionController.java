package com.rikkeisoft.canifashop.presentation.controller.user;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/guest/promotion")
@RequiredArgsConstructor
public class PromotionController extends BaseController {
    private final PromotionService promotionService;
    @GetMapping("/all")
    public ResponseEntity<BaseResponseEntity> getAllPromotions() {
        return success(promotionService.getAll(), "Get all promotions successful");
    }
}
