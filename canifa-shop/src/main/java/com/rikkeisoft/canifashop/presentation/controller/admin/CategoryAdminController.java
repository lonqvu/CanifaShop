package com.rikkeisoft.canifashop.presentation.controller.admin;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BasePagerData;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.presentation.request.CategoryRequest;
import com.rikkeisoft.canifashop.presentation.response.CategoryResponse;
import com.rikkeisoft.canifashop.service.CategoryService;

import com.rikkeisoft.canifashop.service.FileImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/admin/categories")
@RequiredArgsConstructor
public class CategoryAdminController extends BaseController {

	private final CategoryService categoryService;
	private final FileImageService fileImageService;
	
	@GetMapping
	public ResponseEntity<BasePagerData<CategoryResponse>> getCategoryByPaging(
			@RequestParam(name = "page", defaultValue = "0") Integer page,
			@RequestParam(name = "keyword", defaultValue = "-1") String keyword) {
		return ResponseEntity.ok(categoryService.getCategoryByPaging(page, PAGE_SIZE, keyword));
	}

	@GetMapping("/all")
	public ResponseEntity<BaseResponseEntity> getAllCategories() {
		return success(categoryService.getAll(), "Get all categories successful");
	}

	@GetMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> getCategoryById(@PathVariable("id") Long id) {
		return success(categoryService.getById(id), "Get category successful");
	}

	@PostMapping
	public ResponseEntity<BaseResponseEntity> createCategory(@RequestBody CategoryRequest request) {
		return created(categoryService.createOrUpdate(null, request), "Create category successful");
	}

	@PutMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> updateCategory(@PathVariable("id") Long id,
			@RequestBody CategoryRequest request) {
		return success(categoryService.createOrUpdate(id, request), "Update category successful");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> deleteCategory(@PathVariable("id") Long id) {
		categoryService.deleteById(id);
		return success("Delete category successful");
	}

	@GetMapping("/parent")
	public ResponseEntity<BaseResponseEntity> getCategoryParent() {
		return success(categoryService.getCategoryParent(), "Get categories parent successful");
	}

	@PostMapping("/uploadfile/{id}")
	public ResponseEntity<BaseResponseEntity> uploadFile(@PathVariable("id") Long id,
														 @RequestParam("avatar") MultipartFile avatar) {

		return created(fileImageService.storeFileCate(id, avatar), "Create images of category successful");
	}

}
