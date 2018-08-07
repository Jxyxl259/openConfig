package com.yaic.platform.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.dto.ProductDto;
import com.yaic.platform.entity.Product;

public interface ProductService {

	/** 获取产品列表*/
	List<Product> getList(ProductDto productDto);

	/** 删除产品信息*/
	ReturnMsg deleteByIds(String ids);

	/** 修改产品展示信息*/
	ReturnMsg updateProductInfo(ProductDto productDto, MultipartFile productImageFile);

	/** 添加产品展示信息*/
	ReturnMsg addProductInfo(ProductDto productDto, MultipartFile productImageFile);
	
}
