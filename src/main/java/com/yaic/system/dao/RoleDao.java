package com.yaic.system.dao;

import java.util.List;

import com.yaic.system.entity.Role;

public interface RoleDao {
	
    int deleteByPrimaryKey(String roleId);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(String roleId);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);

	List<Role> selectList(Role role);

	int deleteByIds(String[] idsArr);

	String getMaxRoleId();

	List<Role> selectBindRoleByUserId(String userId);
}