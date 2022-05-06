package com.rikkeisoft.canifashop.repository;

import com.rikkeisoft.canifashop.entity.ProductCommentImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductCommentImageRepository extends JpaRepository<ProductCommentImagesEntity, Long> {
    @Modifying
    @Query(value = "DELETE FROM tbl_comment_images WHERE product_comment_id = :productCommentId", nativeQuery = true)
    void deleteByProductCommentId(@Param(value = "productCommentId") long productCommentId);
}
