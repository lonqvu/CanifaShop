package com.rikkeisoft.canifashop.repository;

import com.rikkeisoft.canifashop.entity.FavoriteProductEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteProductRepository extends JpaRepository<FavoriteProductEntity, Long> {

}
