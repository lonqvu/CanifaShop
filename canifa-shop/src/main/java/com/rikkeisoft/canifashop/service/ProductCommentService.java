package com.rikkeisoft.canifashop.service;

import com.rikkeisoft.canifashop.base.BasePagerData;
import com.rikkeisoft.canifashop.common.exception.BadRequestException;
import com.rikkeisoft.canifashop.entity.ProductCommentEntity;
import com.rikkeisoft.canifashop.entity.ProductEntity;
import com.rikkeisoft.canifashop.entity.UserEntity;
import com.rikkeisoft.canifashop.presentation.mapper.OrderMapper;
import com.rikkeisoft.canifashop.presentation.mapper.ProductCommentMapper;
import com.rikkeisoft.canifashop.presentation.request.ProductCommentRequest;
import com.rikkeisoft.canifashop.presentation.response.ProductCommentResponse;
import com.rikkeisoft.canifashop.repository.ProductCommentRepository;
import com.rikkeisoft.canifashop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductCommentService {
    ProductCommentResponse createComment(ProductCommentRequest productCommentRequest, Long id);
    ProductCommentResponse editComment(ProductCommentRequest productCommentRequest, Long id);
    ProductCommentResponse deleteComment(ProductCommentRequest productCommentRequest, Long id);
    ProductCommentEntity getEntityById(Long id);
    BasePagerData<ProductCommentResponse> getListComment(Integer page, Integer size, Long id);
    BasePagerData<ProductCommentResponse> getListCommentByUser(Integer page, Integer size, Long id);
}
@Service
@RequiredArgsConstructor
class ProductCommentServiceImpl implements ProductCommentService{
    private final ProductRepository productRepository;
    private final ProductCommentRepository productCommentRepository;
    private final UserService userService;
    private final ProductService productService;
    @Override
    public ProductCommentResponse createComment(ProductCommentRequest productCommentRequest, Long id) {
        ProductEntity productEntity = productRepository.findByIdAndDeletedFlagFalse(id);
        if(productEntity == null){
            throw new BadRequestException("Product does not exist");
        }
        ProductCommentEntity productCommentEntity = ProductCommentMapper.convertToEntity(productCommentRequest);
        UserEntity userEntity = userService.getEntityById(productCommentRequest.getUserId());
        productCommentEntity.setProductEntity(productEntity);
        productCommentEntity.setUserEntity(userEntity);
        return ProductCommentMapper.convertToResponse(productCommentRepository.save(productCommentEntity));
    }

    @Override
    public ProductCommentResponse editComment(ProductCommentRequest productCommentRequest, Long id) {
        ProductCommentEntity productCommentEntity = this.getEntityById(id);
        if(productCommentEntity != null){
            productCommentEntity.setContent(productCommentRequest.getContent());
        }
        else {
            return null;
        }
        return ProductCommentMapper.convertToResponse(productCommentRepository.save(productCommentEntity));
    }

    @Override
    public ProductCommentResponse deleteComment(ProductCommentRequest productCommentRequest, Long id) {
        return null;
    }

    @Override
    public ProductCommentEntity getEntityById(Long id) {
        ProductCommentEntity productCommentEntity = productCommentRepository.findById(id).get();
        return productCommentEntity;
    }

    @Override
    public BasePagerData<ProductCommentResponse> getListComment(Integer page, Integer size, Long id) {
        Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "created_at"));
        Page<ProductCommentEntity> pageResult = productCommentRepository.findByProductId(id, paging);
        return BasePagerData.build(pageResult.map(e -> ProductCommentMapper.convertToResponse(e)));
    }

    @Override
    public BasePagerData<ProductCommentResponse> getListCommentByUser(Integer page, Integer size, Long id) {
        Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "created_at"));
        Page<ProductCommentEntity> pageResult = productCommentRepository.findByUserId(id, paging);
        return BasePagerData.build(pageResult.map(e -> ProductCommentMapper.convertToResponse(e)));
    }
}
