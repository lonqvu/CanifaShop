package com.rikkeisoft.canifashop.presentation.controller.staff;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BasePagerData;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.presentation.request.CategoryRequest;
import com.rikkeisoft.canifashop.presentation.response.CategoryResponse;
import com.rikkeisoft.canifashop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/staff/categories")
@RequiredArgsConstructor
public class CategoryStaffController extends BaseController {

	private final CategoryService categoryService;
	

	@GetMapping("/parent")
	public ResponseEntity<BaseResponseEntity> getCategoryParent() {
		return success(categoryService.getCategoryParent(), "Get categories parent successful");
	}

}
