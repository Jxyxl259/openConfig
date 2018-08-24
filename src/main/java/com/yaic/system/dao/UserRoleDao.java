package com.yaic.system.dao;

import java.util.List;

import com.yaic.system.entity.UserRole;

public interface UserRoleDao {
	
    int deleteByPrimaryKey(String userRoleId);

    int insert(UserRole record);

    int insertSelective(UserRole record);

    UserRole selectByPrimaryKey(String userRoleId);

    int updateByPrimaryKeySelective(UserRole record);

    int updateByPrimaryKey(UserRole record);

	int deleteByUserId(String userId);
	int saveUserRole(List<UserRole> list);
	List<UserRole> getBindRoleByUserId(String userId);
    
}