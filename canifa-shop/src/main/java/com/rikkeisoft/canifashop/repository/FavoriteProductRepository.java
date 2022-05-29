package com.rikkeisoft.canifashop.repository;

import com.rikkeisoft.canifashop.entity.FavoriteProductEntity;
import com.rikkeisoft.canifashop.presentation.response.FavoriteProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteProductRepository extends JpaRepository<FavoriteProductEntity, Long> {
    @Query(value = "select * from tbl_favorite where user_id = :id", nativeQuery = true)
    List<FavoriteProductEntity> getAllByUserId(Long id);


}
