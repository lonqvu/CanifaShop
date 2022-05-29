package com.rikkeisoft.canifashop.entity;

import com.rikkeisoft.canifashop.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_comments")
public class ProductCommentEntity extends BaseEntity {
    @Column(name = "content", columnDefinition = "text",length = 45, nullable = true)
    private String content;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "productCommentEntity")
    private Set<ProductCommentImagesEntity> commentImages;
    public void addProductCommentImageEntity(ProductCommentImagesEntity productImageEntity) {
        this.commentImages.add(productImageEntity);
        productImageEntity.setProductCommentEntity(this);
    }
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private OrderEntity orderEntity;
}
