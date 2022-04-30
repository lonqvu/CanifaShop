package com.rikkeisoft.canifashop.presentation.mapper;

import com.rikkeisoft.canifashop.entity.ProductCommentEntity;
import com.rikkeisoft.canifashop.presentation.request.ProductCommentRequest;
import com.rikkeisoft.canifashop.presentation.response.ProductCommentResponse;

import java.util.ArrayList;
import java.util.List;

public class ProductCommentMapper {

    ProductCommentMapper(){
        super();
    }
    public static ProductCommentResponse convertToResponse(ProductCommentEntity productCommentEntity){
        return ProductCommentResponse.builder().content(productCommentEntity.getContent())
                .userResponse(UserMapper.convertToResponse(productCommentEntity.getUserEntity()))
                .createdAt(productCommentEntity.getCreatedAt())
                .productResponse(ProductMapper.convertToResponse(productCommentEntity.getProductEntity()))
                .createdBy(productCommentEntity.getCreatedBy()).build();
    }
    public static ProductCommentEntity convertToEntity (ProductCommentRequest productCommentRequest){
        return ProductCommentEntity.builder()
                .content(productCommentRequest.getContent())
                .build();
    }
}
