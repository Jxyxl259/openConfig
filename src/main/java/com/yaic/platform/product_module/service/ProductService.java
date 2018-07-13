package com.yaic.platform.product_module.service;

import com.yaic.platform.product_module.entity.Product;
import com.yaic.platform.product_module.entity.ProductAddDto;
import com.yaic.platform.product_module.entity.ProductModifyDto;

import java.util.List;

public interface ProductService {

	/**
	 * 获取产品列表
	 * @param product
	 * @return
	 */
	List<Product> getList(Product product);


	/**
	 * 下架产品展示
	 * @param strArrNum
	 * @return
	 */
	int deleteByIds(int[] strArrNum);


	/**
	 * 修改产品展示信息
	 * @param product
	 * @return
	 */
	int modifyPartnerInfoByPartnerId(ProductModifyDto product);



	/**
	 * 添加产品展示信息
	 * @param productAddDtoModule
	 * @return
	 */
	int addProductInfo(ProductAddDto productAddDtoModule);
}
