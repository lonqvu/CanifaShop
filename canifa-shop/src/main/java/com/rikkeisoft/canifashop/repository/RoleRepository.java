package com.rikkeisoft.canifashop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rikkeisoft.canifashop.common.enum_.RoleEnum;
import com.rikkeisoft.canifashop.entity.RoleEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

	@Query(value = "SELECT * FROM tbl_roles WHERE name = :name", nativeQuery = true)
	List<RoleEntity> findByName(@Param("name") String name);

	@Query(value = "SELECT name FROM tbl_roles", nativeQuery = true)
	List<String> getAllRole();

	@Query(value = "SELECT * FROM tbl_roles WHERE name = :name", nativeQuery = true)
	RoleEntity findByNameEntity(@Param("name") String name);

	@Query(value = "select name from tbl_roles as r join tbl_users_roles as ur on r.id = ur.role_id where ur.user_id = ?1", nativeQuery = true)
	String role(Long id);
	Boolean existsByName(RoleEnum name);

	@Transactional
	@Modifying
	@Query(value = "UPDATE tbl_users_roles " +
			"SET role_id = (select id from tbl_roles where name = :name)" +
			"WHERE user_id = :id", nativeQuery = true)
	void updateRole(@PathVariable("id") Long id, @Param("name") String name);
}
