package com.yaic.system.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.yaic.system.entity.User;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dao.UserRoleDao;
import com.yaic.system.entity.UserRole;
import com.yaic.system.service.UserRoleService;
import com.yaic.utils.UuidUtils;

@Service
public class UserRoleServiceImpl implements UserRoleService {
	
	private static Logger logger = LoggerFactory.getLogger(UserRoleServiceImpl.class);
	
	@Autowired
	private UserRoleDao userRoleDao;

	@Transactional
	@Override
	public ReturnMsg addInfo(String userId, String roleIds) {
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isBlank(userId)) {
			msg.setSuccess(false);
			msg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_300.getMsg());
			return msg;
		}
		try {
			String[] resourceArray = null;
			if (StringUtils.isNotBlank(roleIds)) {
				resourceArray = roleIds.split(",");
			}
			//执行删除操作
			userRoleDao.deleteByUserId(userId);
			
			if (resourceArray !=null && resourceArray.length > 0) {
				//执行删除操作之后插入数据
				List<UserRole> list = new ArrayList<UserRole>();
				for (String roleId : resourceArray) {
					UserRole userRole = new UserRole();
					userRole.setCreatedBy(((User)SecurityUtils.getSubject().getPrincipal()).getUserCode());
					userRole.setCreatedDate(new Date());
					userRole.setRoleId(roleId);
					userRole.setUserId(userId);
					userRole.setUserRoleId(UuidUtils.getUuidByLength(20));
					list.add(userRole);
				}
				userRoleDao.saveUserRole(list);
			}
			
			msg.setSuccess(true);
			msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
			return msg;
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			msg.setSuccess(false);
			msg.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			msg.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
			return msg;
		}
	}

	@Override
	public ReturnMsg getBindRoleByUserId(String userId) {
		ReturnMsg msg = new ReturnMsg();
		try {
			List<UserRole> list = userRoleDao.getBindRoleByUserId(userId);
			msg.setSuccess(true);
			msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
			msg.setData(list);
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			msg.setSuccess(false);
			msg.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			msg.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return msg;
	}

}
