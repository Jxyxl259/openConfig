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
import com.yaic.system.dao.RoleResourceDao;
import com.yaic.system.entity.RoleResource;
import com.yaic.system.service.RoleResourceService;

@Service
public class RoleResourceServiceImpl implements RoleResourceService {
	
	private static Logger logger = LoggerFactory.getLogger(RoleResourceServiceImpl.class);
	
	@Autowired
	private RoleResourceDao roleResourceDao;
	
	

	@Override
	public ReturnMsg getBindResourceByRoleId(String roleId) {
		ReturnMsg msg = new ReturnMsg();
		try {
			List<RoleResource> list = roleResourceDao.getBindResourceByRoleId(roleId);
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



	/**
	 * @Title: addInfo
	 * @Description: 先delete后insert，防止insert异常导致数据不一致，这里加上事物控制
	 * @param roleResourceDto
	 * @return
	 * @see com.yaic.system.service.RoleResourceService#addInfo(com.yaic.system.dto.RoleResourceDto)
	 */
	@Transactional
	@Override
	public ReturnMsg addInfo(String roleId, String resourceIds) {
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isBlank(roleId)) {
			msg.setSuccess(false);
			msg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_300.getMsg());
			return msg;
		}
		try {
			String[] resourceArray = null;
			if (StringUtils.isNotBlank(resourceIds)) {
				resourceArray = resourceIds.split(",");
			}
			//执行删除操作
			roleResourceDao.deleteByRoleId(roleId);
			
			if (resourceArray !=null && resourceArray.length > 0) {
				//执行删除操作之后插入数据
				List<RoleResource> list = new ArrayList<RoleResource>();
				for (String resId : resourceArray) {
					RoleResource roleRes = new RoleResource();
					roleRes.setCreatedBy(((User)SecurityUtils.getSubject().getPrincipal()).getUserCode());
					roleRes.setCreatedDate(new Date());
					roleRes.setRoleId(roleId);
					roleRes.setResourceId(resId);
					list.add(roleRes);
				}
				roleResourceDao.saveRoleResource(list);
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

	
}
