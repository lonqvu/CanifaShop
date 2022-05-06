package com.rikkeisoft.canifashop.presentation.controller.user;

import com.rikkeisoft.canifashop.service.FileImageService;
import com.rikkeisoft.canifashop.service.OrderService;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rikkeisoft.canifashop.base.BaseController;
import com.rikkeisoft.canifashop.base.BaseResponseEntity;
import com.rikkeisoft.canifashop.presentation.request.UserRequest;
import com.rikkeisoft.canifashop.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;

@CrossOrigin(origins = "${domain.origins}")
@RestController
@RequestMapping("${base.api}/user/profile")
@RequiredArgsConstructor
public class UserController extends BaseController {

	public final UserService userService;

	private final FileImageService fileImageService;

	private final OrderService orderService;

	@PutMapping("/edit/{username}")
	public ResponseEntity<BaseResponseEntity> updateUser(@PathVariable("username") String username,
			@RequestBody UserRequest request) {
		return success(userService.updateUser(username, request), "Update user successful");
	}

	@PutMapping("/edit/password/{username}")
	public ResponseEntity<BaseResponseEntity> updatePasswordByUsername(@PathVariable("username") String username,
			@RequestBody UserRequest request) {
		userService.updatePasswordByUsername(username, request);
		return success("Update password successful");
	}

	@GetMapping("/{username}")
	public ResponseEntity<BaseResponseEntity> getUserByUsername(@PathVariable("username") String username) {
		return success(userService.getUserByUsername(username), "Get user successful");
	}

	@PostMapping("/uploadfile/{id}")
	public ResponseEntity<BaseResponseEntity> uploadFile(@PathVariable("id") Long id,
														 @RequestParam("avatar") MultipartFile avatar) {

		return created(fileImageService.storeFileUser(id, avatar), "Create images of product successful");
	}

	@PutMapping("updateStatus/{id}")
	public ResponseEntity<BaseResponseEntity> updateStatus(@PathVariable Long id,
														   @RequestParam("orderStatus") Integer orderStatus) throws MessagingException {
		return success(orderService.updateOrderStatus(id, orderStatus), "Update status order successful");
	}


}
