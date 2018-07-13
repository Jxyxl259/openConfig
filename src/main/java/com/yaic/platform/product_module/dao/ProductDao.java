package com.yaic.platform.product_module.dao;

import com.yaic.platform.product_module.entity.Product;
import com.yaic.platform.product_module.entity.ProductModifyDto;

import java.util.List;

public interface ProductDao {
    int deleteByPrimaryKey(Integer productId);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Integer productId);

    int updateByPrimaryKeySelective(ProductModifyDto record);

    int updateByPrimaryKeyWithBLOBs(Product record);

    int updateByPrimaryKey(Product record);

    /**
     * 查询产品列表
     * @param record
     * @return
     */
    List<Product> selectList(Product record);

    /**
     * 删除产品展示信息
     * @param strArrNum
     * @return
     */
    int deleteByIds(int[] strArrNum);
}