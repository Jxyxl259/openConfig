package com.yaic.platform.dao;


import com.yaic.platform.dto.ProductAddDto;
import com.yaic.platform.dto.ProductListDto;
import com.yaic.platform.dto.ProductModifyDto;
import com.yaic.platform.entity.Product;

import java.util.List;

public interface ProductDao {
    int deleteByPrimaryKey(Integer productId);

    int insert(Product record);

    int insertSelective(ProductAddDto record);

    Product selectByPrimaryKey(Integer productId);

    int updateByPrimaryKeySelective(ProductModifyDto record);

    int updateByPrimaryKeyWithBLOBs(Product record);

    int updateByPrimaryKey(Product record);

    /**
     * 查询产品列表
     * @param record
     * @return
     */
    List<Product> selectList(ProductListDto record);

    /**
     * 删除产品展示信息
     * @param strArrNum
     * @return
     */
    int deleteByIds(int[] strArrNum);
}