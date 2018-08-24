package com.yaic.system.service;

import com.yaic.platform.common.ReturnMsg;

public interface RoleResourceService {

	ReturnMsg addInfo(String roleId, String resourceIds);

	ReturnMsg getBindResourceByRoleId(String roleId);

}
