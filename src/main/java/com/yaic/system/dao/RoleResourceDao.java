package com.yaic.system.dao;

import java.util.List;

import com.yaic.system.entity.Resource;
import com.yaic.system.entity.RoleResource;

public interface RoleResourceDao {
	
    int deleteByPrimaryKey(Integer roleResourceId);

    int insert(RoleResource record);

    int insertSelective(RoleResource record);

    RoleResource selectByPrimaryKey(Integer roleResourceId);

    List<Resource> selectResourcesByRoleIds(String[] roleIds);

    int updateByPrimaryKeySelective(RoleResource record);

    int updateByPrimaryKey(RoleResource record);
    
    List<RoleResource> getBindResourceByRoleId(String roleId);

    int deleteByRoleId(String roleId);

    int saveRoleResource(List<RoleResource> list);



}