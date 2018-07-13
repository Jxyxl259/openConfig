package com.yaic.platform.user_module.service;

import com.yaic.platform.user_module.entity.ThirdUser;

import java.util.List;

public interface ThirdUserAccountService {


	/**
	 * @Title: getList
	 * @Description: 查询第三方用户账户信息列表
	 * @param accountModel
	 * @return
	 * @return List<ThirdUser>
	 * @throws
	 */
	public List<ThirdUser> getList(ThirdUser accountModel);


	/**
	 * 通过ID修改第三方账户的信息（修改内容包括 authFlag(是否授权) validFlag(是否有效)两个字段）
	 * @param accountModel
	 * @return
	 */
	public int modifyAccountInfoByAccountId(ThirdUser accountModel);

	int deleteByIds(int[] strArrNum);
}