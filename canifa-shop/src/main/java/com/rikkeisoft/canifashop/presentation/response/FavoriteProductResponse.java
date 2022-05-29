package com.rikkeisoft.canifashop.presentation.response;

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
public class FavoriteProductResponse {
    private UserResponse userResponse;
    private ProductResponse productResponse;
    private String createdBy;
}
