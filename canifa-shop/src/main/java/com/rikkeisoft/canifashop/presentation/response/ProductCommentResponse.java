package com.rikkeisoft.canifashop.presentation.response;

import com.rikkeisoft.canifashop.base.BaseResponse;
import com.rikkeisoft.canifashop.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ProductCommentResponse extends BaseResponse{
    private String content;
    private UserResponse userResponse;
    private ProductResponse productResponse;
    private String createdBy;
}
