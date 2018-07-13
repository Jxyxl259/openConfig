package com.yaic.platform.user_module.dao;

import com.yaic.platform.user_module.entity.ThirdUser;

import java.util.List;

public interface ThirdUserDao {
    int deleteByPrimaryKey(Integer accountId);

    int insert(ThirdUser record);

    int insertSelective(ThirdUser record);

    ThirdUser selectByPrimaryKey(Integer accountId);

    List<ThirdUser> selectList(ThirdUser record);

    int updateByPrimaryKeySelective(ThirdUser record);

    int updateByPrimaryKey(ThirdUser record);

	int deleteByIds(int[] strArrNum);
}