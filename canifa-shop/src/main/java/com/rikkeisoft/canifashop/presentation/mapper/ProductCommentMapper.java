package com.rikkeisoft.canifashop.presentation.mapper;

import com.rikkeisoft.canifashop.entity.ProductCommentEntity;
import com.rikkeisoft.canifashop.presentation.request.ProductCommentRequest;
import com.rikkeisoft.canifashop.presentation.response.ProductCommentResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProductCommentMapper {

    ProductCommentMapper(){
        super();
    }
    public static ProductCommentResponse convertToResponse(ProductCommentEntity productCommentEntity){
        List<String> listImages;
        try {
            listImages = productCommentEntity.getCommentImages().stream().map(e -> e.getPath()).collect(Collectors.toList());
        } catch (Exception e) {
            listImages = new ArrayList<>();
        }
        return ProductCommentResponse.builder().content(productCommentEntity.getContent())
                .id(productCommentEntity.getId())
                .userResponse(UserMapper.convertToResponse(productCommentEntity.getUserEntity()))
                .createdAt(productCommentEntity.getCreatedAt())
                .productResponse(ProductMapper.convertToResponse(productCommentEntity.getProductEntity()))
                .createdBy(productCommentEntity.getCreatedBy())
                .listImages(listImages)
                .build();
    }
    public static ProductCommentEntity convertToEntity (ProductCommentRequest productCommentRequest){
        return ProductCommentEntity.builder()
                .content(productCommentRequest.getContent())
                .build();
    }
}
