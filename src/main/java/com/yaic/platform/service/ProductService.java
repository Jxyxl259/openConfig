package com.yaic.platform.service;

import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.dto.ProductAddDto;
import com.yaic.platform.dto.ProductDeleteDto;
import com.yaic.platform.dto.ProductListDto;
import com.yaic.platform.dto.ProductModifyDto;
import com.yaic.platform.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

	/**
	 * 获取产品列表
	 * @param productListDto
	 * @return
	 */
	List<Product> getList(ProductListDto productListDto);


	/**
	 * 删除产品信息
	 * @param productDeleteDto
	 * @return
	 */
	ResultMessage<Integer> deleteProductInfo(ProductDeleteDto productDeleteDto);


	/**
	 * 修改产品展示信息
	 * @param productModifyDto
	 * @param productImageFile
	 * @return
	 */
	ResultMessage<Integer> modifyPartnerInfoByPartnerId(ProductModifyDto productModifyDto, MultipartFile productImageFile);



	/**
	 * 添加产品展示信息
	 * @param productAddDtoModule
	 * @return
	 */
	ResultMessage<Integer> addProductInfo(ProductAddDto productAddDtoModule, MultipartFile productImageFile);
}
