package com.rikkeisoft.canifashop.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


import com.rikkeisoft.canifashop.presentation.response.RevenueByResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;

import com.rikkeisoft.canifashop.entity.OrderEntity;
import com.rikkeisoft.canifashop.presentation.response.statisticalReponse;
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	@Query(value = "SELECT * " +
			"FROM tbl_orders " +
			"where month(updated_at) = :month " +
			"And year(updated_at) = :year " +
			"AND order_status = 'COMPLETED'", nativeQuery = true)
	Page<OrderEntity> listOrderByMonth(@Param("year") Integer year, @Param("month") Integer month, Pageable pageable);

	@Query(value = "SELECT * FROM tbl_orders WHERE deleted_flag IS FALSE "
			+ "AND (:keyword IS NULL or (code LIKE %:keyword% OR customer_name LIKE %:keyword%)) ", nativeQuery = true)
	Page<OrderEntity> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

	OrderEntity findByCode(String code);

	@Query(value = "SELECT COUNT(id) FROM tbl_orders WHERE deleted_flag IS FALSE", nativeQuery = true)
	Integer countOrders();

	@Query(value = "SELECT SUM(total) from tbl_orders WHERE deleted_flag IS FALSE AND order_status = 'PENDING' AND year(updated_at) = :year and month(updated_at) = :month ", nativeQuery = true)
	BigDecimal getYear(@Param("year") Integer year, @Param("month") Integer month);

	@Query(value = "SELECT MONTH(updated_at) as month, sum(total) as total " +
			"from tbl_orders WHERE deleted_flag IS FALSE " +
			"AND order_status = 'COMPLETED' and year(updated_at) = :year " +
			"group by month(updated_at) " +
			"order by month(updated_at) asc", nativeQuery = true)
	List<statisticalReponse> StatisticalByYear(@Param("year") Integer year);
	@Query(value = "SELECT month(o.updated_at) as month, p.name, sum(total) as total" +
			"from tbl_orders as o" +
			"right join tbl_order_details as od on o.id = od.order_id" +
			" join tbl_product_detail as pd on od.product_detail_id = pd.id" +
			" join tbl_products as p on pd.product_id = p.id" +
			" WHERE o.deleted_flag IS FALSE" +
			"AND order_status = 'COMPLETED'" +
			"AND p.name = :name"+
			"AND year(o.updated_at) = :year order by month(updated_at) asc", nativeQuery = true)
	List<statisticalReponse> StatisticalByProductAndYear(@Param("year") Integer year, @Param("name") String name);

	@Query(value = "SELECT * FROM tbl_orders WHERE deleted_flag IS FALSE "
			+ "AND user_id IN (SELECT id FROM tbl_users WHERE username = :username) "
			+ "AND (:status IS NULL OR (order_status = :status)) ", nativeQuery = true)
	List<OrderEntity> filterOrderByStatus(@Param("username") String username, @Param("status") String status);

	@Query(value = "SELECT p.name as name, count(pd.id) as quantity,count(pd.id)*(p.price/100*(100-p.discount)) as total"
			+ " from tbl_orders as o" +
			" right join tbl_order_details as od on o.id = od.order_id" +
			" join tbl_product_detail as pd on od.product_detail_id = pd.id" +
			" join tbl_products as p on pd.product_id = p.id" +
			" WHERE o.deleted_flag IS FALSE " +
			" AND order_status = 'COMPLETED' " +
			" AND( o.updated_at between ?1 and ?2)"+
			" group by p.name" +
			" order by count(pd.id)*p.price desc limit 5;", nativeQuery = true)
	List<RevenueByResponse> RevenueByTop5(LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "SELECT pa1.name as name, count(pd.id) as quantity,count(pd.id)*(p.price/100*(100-p.discount)) as total  " +
			"  from tbl_orders as o   " +
			"  join tbl_order_details as od on o.id = od.order_id   " +
			"  join tbl_product_detail as pd on od.product_detail_id = pd.id   " +
			"  join tbl_products as p on pd.product_id = p.id   " +
			"  join tbl_categories as c on p.category_id = c.id  " +
			" join tbl_categories as pa on c.parent_id = pa.id " +
			" join tbl_categories as pa1 on pa.parent_id = pa1.id " +
			"  WHERE o.deleted_flag IS FALSE    " +
			"  AND order_status = 'COMPLETED'    " +
			"  AND( o.updated_at between ?1 and ?2)  " +
			"  group by pa1.name   " +
			"  order by count(pd.id)*p.price limit 5", nativeQuery = true)
	List<RevenueByResponse> RevenueByTop5Cate(LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "SELECT p.name as name, count(pd.id) as quantity,count(pd.id)*(p.price/100*(100-p.discount)) as total"
			+ " from tbl_orders as o" +
			" right join tbl_order_details as od on o.id = od.order_id" +
			" join tbl_product_detail as pd on od.product_detail_id = pd.id" +
			" join tbl_products as p on pd.product_id = p.id" +
			" WHERE o.deleted_flag IS FALSE " +
			" AND order_status = 'COMPLETED' " +
			" AND( o.updated_at between ?1 and ?2)"+
			" group by p.name" +
			" order by count(pd.id) desc", nativeQuery = true)
	List<RevenueByResponse> RevenueByQuantity(LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "SELECT c.name as name, count(pd.id) as quantity,count(pd.id)*(p.price/100*(100-p.discount)) as total  " +
			"  from tbl_orders as o   " +
			"  join tbl_order_details as od on o.id = od.order_id   " +
			"  join tbl_product_detail as pd on od.product_detail_id = pd.id   " +
			"  join tbl_products as p on pd.product_id = p.id   " +
			"  join tbl_categories as c on p.category_id = c.id  " +
			" join tbl_categories as pa on c.parent_id = pa.id " +
			"  WHERE o.deleted_flag IS FALSE    " +
			"  AND order_status = 'COMPLETED'    " +
			" 	AND pa.parent_id = ?3" +
			"  AND( o.updated_at between ?1 and ?2)  " +
			"  group by c.name   " +
			"  order by count(pd.id)*p.price desc;", nativeQuery = true)
	List<RevenueByResponse> RevenueByCate(LocalDateTime startDate, LocalDateTime endDate, Long parentId);

	@Query(value = "SELECT u.username as username, CONCAT(u.first_name , \" \", u.last_name  ) as name , count(u.id) as quantity, sum(total) as total , count(o.user_id) as cancel " +
			" from tbl_orders as o   " +
			" join tbl_users as u on o.user_id = u.id  " +
			" WHERE o.deleted_flag IS FALSE " +
			" AND order_status = 'COMPLETED'" +
			" AND( o.updated_at between ?1 and ?2) " +
			" group by u.username  " +
			" order by count(u.id) desc limit 10;", nativeQuery = true)
	List<RevenueByResponse> RevenueByTop10User(LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "select count(user_id)" +
			" from tbl_orders as o" +
			" WHERE o.deleted_flag IS FALSE  "+
			" AND( o.updated_at between ?2 and ?3) " +
			" AND order_status = ?1", nativeQuery = true)
	Integer Return(String status, LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "SELECT u.username as username, CONCAT(u.first_name , \" \", u.last_name  ) as name , count(u.id) as quantity, sum(total) as total , count(o.user_id) as cancel   " +
			"  from tbl_orders as o     " +
			"   join tbl_users as u on o.user_id = u.id   " +
			"   WHERE o.deleted_flag IS FALSE  " +
			"   AND order_status = 'CANCELED'  " +
			"   AND( o.updated_at between :startDate and :endDate)" +
			"   group by u.username    " +
			"   order by count(o.user_id) desc;", nativeQuery = true)
	List<RevenueByResponse> RevenueByReturn(LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "SELECT u.username as username, CONCAT(u.first_name , \" \", u.last_name  ) as Name , count(u.id) as quantity, sum(total) as total, 0 as cancel  " +
			"    from tbl_orders as o   " +
			"   join tbl_users as u on o.user_id = u.id  " +
			"   WHERE o.deleted_flag IS FALSE    " +
			"   AND order_status = 'COMPLETED'  " +
			"   AND( o.updated_at between ?1 and ?2)  " +
			"   group by u.username, u.id  " +
			"   order by count(o.user_id) desc;", nativeQuery = true)
	List<RevenueByResponse> RevenueByQuantityOrderComplete(LocalDateTime startDate, LocalDateTime endDate);

	@Query(value = "SELECT u.username as username, CONCAT(u.first_name , \" \", u.last_name  ) as Name , count(u.id) as quantity, sum(total) as total, count(o.user_id) as cancel  " +
			"    from tbl_orders as o   " +
			"   join tbl_users as u on o.user_id = u.id  " +
			"   WHERE o.deleted_flag IS FALSE " +
			"   AND order_status = 'CANCELED' " +
			"   AND( o.updated_at between ?1 and ?2)  " +
			"   group by u.username, u.id  " +
			"   order by count(o.user_id) desc;", nativeQuery = true)
	List<RevenueByResponse> RevenueByQuantityOrderCancel(LocalDateTime startDate, LocalDateTime endDate);
}
