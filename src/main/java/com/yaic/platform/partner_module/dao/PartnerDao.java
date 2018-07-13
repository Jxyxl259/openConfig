package com.yaic.platform.partner_module.dao;

import com.yaic.platform.partner_module.entity.Partner;

import java.util.List;

public interface PartnerDao {
    int deleteByPrimaryKey(Integer partnerId);

    int insert(Partner record);

    int insertSelective(Partner record);

    Partner selectByPrimaryKey(Integer partnerId);

    int updateByPrimaryKeySelective(Partner record);

    int updateByPrimaryKey(Partner record);

	List<Partner> selectList(Partner partnerModule);

    int deleteByIds(int[] strArrNum);
}