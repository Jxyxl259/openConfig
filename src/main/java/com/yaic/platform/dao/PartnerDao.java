package com.yaic.platform.dao;


import java.util.List;

import com.yaic.platform.entity.Partner;

public interface PartnerDao {
	
    int deleteByPrimaryKey(Integer partnerId);

    Partner selectByPrimaryKey(Integer partnerId);

    int updateByPrimaryKeySelective(Partner record);

    int updateByPrimaryKey(Partner record);

    int deleteByIds(int[] strArrNum);
    
    List<Partner> selectList(Partner partner);
    
    int insertSelective(Partner record);

	List<Partner> selectListByKeys(int[] idArr);
}