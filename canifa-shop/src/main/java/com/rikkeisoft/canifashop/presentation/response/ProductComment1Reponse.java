package com.rikkeisoft.canifashop.presentation.response;

import com.rikkeisoft.canifashop.base.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ProductComment1Reponse extends BaseResponse {
    private String content;
    private Long parenId;
    private UserResponse userResponse;
    private ProductResponse productResponse;
    private String createdBy;
}
