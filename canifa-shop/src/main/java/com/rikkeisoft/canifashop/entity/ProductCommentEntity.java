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
@Table(name = "tbl_comments")
public class ProductCommentEntity extends BaseEntity {
    @Column(name = "content", columnDefinition = "text",length = 45, nullable = true)
    private String content;
    private Long parentId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;
}
