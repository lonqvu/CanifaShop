package com.rikkeisoft.canifashop.entity;

import com.rikkeisoft.canifashop.base.BaseEntity;
import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_comment_images")
public class ProductCommentImagesEntity extends BaseEntity {
    @Column(name = "path", length = 200, nullable = false)
    private String path;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_comment_id",nullable = false)
    private ProductCommentEntity productCommentEntity;
    
}
