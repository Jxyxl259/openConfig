package com.yaic.platform.service;


import java.util.List;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.dto.ThirdUserDto;
import com.yaic.platform.entity.ThirdUser;

public interface ThirdUserAccountService {

	/** @Description: 查询第三方用户账户信息列表 */
	public List<ThirdUser> getList(ThirdUserDto accountModel);

	/** 通过ID修改第三方账户的信息（修改内容包括 authFlag(是否授权) validFlag(是否有效)两个字段） */
	public ReturnMsg modifyAccountInfoByAccountId(ThirdUserDto accountModel);

	public ReturnMsg deleteByIds(String accountIds);
}