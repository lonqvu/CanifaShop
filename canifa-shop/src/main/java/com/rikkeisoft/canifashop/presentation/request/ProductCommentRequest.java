package com.rikkeisoft.canifashop.presentation.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCommentRequest {
    private String content;
    private Long userId;
    private Long productId;
}
