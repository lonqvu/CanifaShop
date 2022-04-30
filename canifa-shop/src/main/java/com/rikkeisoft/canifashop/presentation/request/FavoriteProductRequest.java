package com.rikkeisoft.canifashop.presentation.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteProductRequest {
    private Long userId;
    private Long productId;
}
