package com.yaic.system.dao;

import java.util.List;

import com.yaic.system.entity.Resource;

public interface ResourceDao {
	
    int deleteByPrimaryKey(String resourceId);

    int insert(Resource record);

    int insertSelective(Resource record);

    Resource selectByPrimaryKey(String resourceId);

    List<Resource> selectResourcesByRoleIds(String[] roleIds);

    int updateByPrimaryKeySelective(Resource record);

    int updateByPrimaryKey(Resource record);

	List<Resource> getListByPid(String parentId);

	String queryMaxIdByParentId(String parentResourceId);
	
	List<Resource> selectAllBySelective(Resource resource);
    
}