package com.yaic.system.service;

import java.util.List;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dto.UserDto;
import com.yaic.system.entity.User;

public interface UserService {

	List<User> getList(UserDto dto);

	ReturnMsg updateUser(UserDto dto);

	ReturnMsg deleteByIds(String ids);

	ReturnMsg addUser(UserDto dto);

	ReturnMsg getOneById(String id);

	/**
	 * 通过员工代码精确查询员工信息
	 * @param userCode
	 * @return
	 */
	User getUserInfoByUserCode(String userCode);

}
