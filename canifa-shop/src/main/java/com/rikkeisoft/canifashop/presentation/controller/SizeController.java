package com.rikkeisoft.canifashop.presentation.controller;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.service.SizeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/guest/sizes")
@RequiredArgsConstructor
public class SizeController extends BaseController {

	private final SizeService sizeService;

	@GetMapping("/all")
	public ResponseEntity<BaseResponseEntity> getAllSizes() {
		return success(sizeService.getAll(), "Get all sizes successful");
	}
}
