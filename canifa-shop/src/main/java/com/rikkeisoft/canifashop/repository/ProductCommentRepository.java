package com.rikkeisoft.canifashop.repository;

import com.rikkeisoft.canifashop.entity.ProductCommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCommentRepository extends JpaRepository<ProductCommentEntity, Long> {
    boolean existsById(Long parenId);
    @Query(nativeQuery = true, value = "SELECT * FROM tbl_comments as cm join tbl_products as p on cm.product_id = p.id where product_id = :id")
    Page<ProductCommentEntity> findByProductId(Long id, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM tbl_comments as cm join tbl_products as p on cm.product_id = p.id where cm.user_id = :id")
    Page<ProductCommentEntity> findByUserId(Long id, Pageable pageable);
}
