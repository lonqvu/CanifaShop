package com.rikkeisoft.canifashop.service;

import com.rikkeisoft.canifashop.entity.ProductDetailEntity;
import com.rikkeisoft.canifashop.repository.ProductDetailRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface ProductDetailService {

	ProductDetailEntity getEntityById(Long id);

}

@Service
@RequiredArgsConstructor
class ProductDetailImpl implements ProductDetailService {

	private final ProductDetailRepository productDetailRepository;

	@Override
	public ProductDetailEntity getEntityById(Long id) {
		if (id != null) {
			return productDetailRepository.findById(id).get();
		} else {
			return null;
		}
	}
}
