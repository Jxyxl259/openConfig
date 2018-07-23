package com.yaic.platform.dao;


import com.yaic.platform.dto.PartnerAddDto;
import com.yaic.platform.dto.PartnerListDto;
import com.yaic.platform.dto.PartnerModifyDto;
import com.yaic.platform.entity.Partner;

import java.util.List;

public interface PartnerDao {
    int deleteByPrimaryKey(Integer partnerId);

    int insert(PartnerAddDto record);

    int insertSelective(Partner record);

    Partner selectByPrimaryKey(Integer partnerId);

    int updateByPrimaryKeySelective(PartnerModifyDto record);

    int updateByPrimaryKey(Partner record);

	List<Partner> selectList(PartnerListDto partnerModule);

    int deleteByIds(int[] strArrNum);
}