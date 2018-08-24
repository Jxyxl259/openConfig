package com.yaic.system.service;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dto.ResourceDto;
import com.yaic.system.entity.Resource;

import java.util.List;

public interface ResourceService {

	ReturnMsg getListByPid(String parentId);

	ReturnMsg deleteById(String resourceId);

	ReturnMsg addResource(ResourceDto resourceDto);

	ReturnMsg updateResource(ResourceDto resourceDto);

	ReturnMsg getOneById(String resourceId);

	ReturnMsg getList();

	List<Resource> getBindResourceByRoleIds(String[] roleIds);

}
