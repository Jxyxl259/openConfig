package com.yaic.system.service;

import com.yaic.platform.common.ReturnMsg;

public interface UserRoleService {

	ReturnMsg addInfo(String userId, String roleIds);

	ReturnMsg getBindRoleByUserId(String userId);

}
