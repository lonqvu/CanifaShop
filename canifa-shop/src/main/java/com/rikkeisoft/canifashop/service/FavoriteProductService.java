package com.rikkeisoft.canifashop.service;

import com.rikkeisoft.canifashop.common.exception.BadRequestException;
import com.rikkeisoft.canifashop.entity.FavoriteProductEntity;
import com.rikkeisoft.canifashop.entity.ProductEntity;
import com.rikkeisoft.canifashop.entity.UserEntity;
import com.rikkeisoft.canifashop.presentation.mapper.FavoriteProductMapper;
import com.rikkeisoft.canifashop.presentation.request.FavoriteProductRequest;
import com.rikkeisoft.canifashop.presentation.response.FavoriteProductResponse;
import com.rikkeisoft.canifashop.repository.FavoriteProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


public interface FavoriteProductService {
    FavoriteProductResponse addListFavoriteProduct(FavoriteProductRequest favoriteProductRequest, Long id);
}
@Service
@RequiredArgsConstructor
class FavoriteProductImpl implements FavoriteProductService{
    private final ProductService productService;
    private final UserService userService;
    private final FavoriteProductRepository favoriteProductRepository;
    @Override
    public FavoriteProductResponse addListFavoriteProduct(FavoriteProductRequest favoriteProductRequest, Long id) {
        ProductEntity productEntity = productService.getEntityById(id);
        if(productEntity == null || !favoriteProductRepository.existsById(id)){
            throw new BadRequestException("product doesn't exist");
        }
        FavoriteProductEntity favoriteProductEntity = FavoriteProductMapper.convertToEntity(favoriteProductRequest);
        UserEntity userEntity = userService.getEntityById(favoriteProductRequest.getUserId());
        favoriteProductEntity.setProductEntity(productEntity);
        favoriteProductEntity.setUserEntity(userEntity);
        return FavoriteProductMapper.convertToResponse(favoriteProductRepository.save(favoriteProductEntity));
    }
}
