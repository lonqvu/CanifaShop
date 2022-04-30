package com.rikkeisoft.canifashop.presentation.mapper;

import com.rikkeisoft.canifashop.entity.FavoriteProductEntity;
import com.rikkeisoft.canifashop.entity.ProductCommentEntity;
import com.rikkeisoft.canifashop.presentation.request.FavoriteProductRequest;
import com.rikkeisoft.canifashop.presentation.response.FavoriteProductResponse;
import com.rikkeisoft.canifashop.presentation.response.ProductCommentResponse;

public class FavoriteProductMapper {
    public static FavoriteProductResponse convertToResponse(FavoriteProductEntity favoriteProductEntity){
        return FavoriteProductResponse.builder().userResponse(UserMapper.convertToResponse(favoriteProductEntity.getUserEntity()))
                .productResponse(ProductMapper.convertToResponse(favoriteProductEntity.getProductEntity()))
                .createdBy(favoriteProductEntity.getCreatedBy()).build();
    }
    public static FavoriteProductEntity convertToEntity(FavoriteProductRequest favoriteProductRequest){
        return FavoriteProductEntity.builder().build();
    }
}
