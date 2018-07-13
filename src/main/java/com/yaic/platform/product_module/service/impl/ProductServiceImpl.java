package com.yaic.platform.product_module.service.impl;

import com.alibaba.fastjson.JSON;
import com.yaic.platform.product_module.dao.ProductDao;
import com.yaic.platform.product_module.entity.Product;
import com.yaic.platform.product_module.entity.ProductAddDto;
import com.yaic.platform.product_module.entity.ProductModifyDto;
import com.yaic.platform.product_module.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

	private static Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

	@Autowired
	private ProductDao productDao;


	@Override
	public List<Product> getList(Product product) {
		log.debug("Query ProductList Param={}", JSON.toJSONString(product));
		List<Product> productList = productDao.selectList(product);
		log.debug("Query ProductList Result={}", JSON.toJSONString(productList));
		return productList;
	}

	@Override
	public int deleteByIds(int[] strArrNum) {
		log.debug("Delete ProductInfo Ids={}", strArrNum);
		int i = productDao.deleteByIds(strArrNum);
		log.debug("Delete PartnerInfo affectedRows={}", i);
		return i;
	}

	@Override
	public int modifyPartnerInfoByPartnerId(ProductModifyDto productModifyDtoModule) {
		log.debug("Update ProductInfo Param:{}", JSON.toJSONString(productModifyDtoModule));
		productModifyDtoModule.setUpdateDate(new Date());
		int i = productDao.updateByPrimaryKeySelective(productModifyDtoModule);
		log.debug("Update ProductInfo affectedRows={}", i);
		return i;
	}

	@Override
	public int addProductInfo(ProductAddDto productAddDtoModule) {

		return 0;
	}


}