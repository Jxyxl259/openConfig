package com.yaic.platform.dao;

import java.util.List;

import com.yaic.platform.entity.Product;

public interface ProductDao {
	
    int deleteByPrimaryKey(Integer productId);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Integer productId);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKeyWithBLOBs(Product record);

    int updateByPrimaryKey(Product record);

    List<Product> selectList(Product record);

    int deleteByIds(int[] strArrNum);

	List<Product> selectListByKeys(int[] intIds);
    
}