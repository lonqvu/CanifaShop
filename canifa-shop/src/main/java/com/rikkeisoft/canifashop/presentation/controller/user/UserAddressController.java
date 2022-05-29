package com.rikkeisoft.canifashop.presentation.controller.user;

import com.rikkeisoft.canifashop.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.presentation.request.UserAddressRequest;
import com.rikkeisoft.canifashop.service.UserAddressService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequiredArgsConstructor
@RequestMapping("${base.api}/user/address")
public class UserAddressController extends BaseController{

	public final UserAddressService addressService;
	private final UserRepository userRepository;

	@GetMapping("/list/{username}")
	public ResponseEntity<BaseResponseEntity> getAddressByUsername(@PathVariable("username") String username) {
		return success(addressService.getAddressByUsername(username), "Get list address by username successful");
	}

	@GetMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> getAddressById(@PathVariable("id") Long id) {
		return success(addressService.getById(id), "Get user address successful");
	}

	@PostMapping
	public ResponseEntity<BaseResponseEntity> createAddress(@RequestBody UserAddressRequest request) {
		return created(addressService.createOrUpdate(null, request), "Create user address successful");
	}

	@PutMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> updateAddress(@PathVariable("id") Long id,
			@RequestBody UserAddressRequest request) {
		return success(addressService.createOrUpdate(id, request), "Update user address successful");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<BaseResponseEntity> deleteById(@PathVariable("id") Long id) {
		addressService.deleteById(id);
		return success("Delete user address successful");
	}
	@GetMapping("/getByUserName")
	public Long getIdByUserName (@RequestParam("name") String name){
		return userRepository.getIdByUsername(name);
	}
	
}
