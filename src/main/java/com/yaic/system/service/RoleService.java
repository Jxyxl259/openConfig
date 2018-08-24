package com.yaic.system.service;

import java.util.List;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dto.RoleDto;
import com.yaic.system.entity.Role;

public interface RoleService {

	List<Role> getList(RoleDto roleDto);

	ReturnMsg updateRole(RoleDto roleDto);

	ReturnMsg deleteByIds(String ids);

	ReturnMsg addRole(RoleDto roleDto);

	ReturnMsg getOneById(String id);

	List<Role> getAll();

	List<Role> getBindRoleByUserId(String userId);

}
