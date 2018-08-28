package com.yaic.system.service.impl;

import java.util.Date;
import java.util.List;

import com.yaic.system.entity.User;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dao.RoleDao;
import com.yaic.system.dto.RoleDto;
import com.yaic.system.entity.Role;
import com.yaic.system.service.RoleService;
import com.yaic.utils.BeanCopyUtils;

@Service
public class RoleServiceImpl implements RoleService {

	private Logger logger = LoggerFactory.getLogger(RoleServiceImpl.class);
	
	@Autowired
	private RoleDao roleDao;
	
	@Override
	public List<Role> getList(RoleDto roleDto) {
		// 数据获取
		Role role = new Role();
		BeanCopyUtils.beanCopy(roleDto, role);
		return roleDao.selectList(role);
	}

	@Override
	public List<Role> getAll() {
		Role role = new Role();
		role.setValidFlag(1);
		return roleDao.selectList(role);
	}

	@Override
	public ReturnMsg updateRole(RoleDto roleDto) {
		ReturnMsg result = new ReturnMsg();
		try {
			// 数据入库
			Role role = new Role();
			BeanCopyUtils.beanCopy(roleDto, role);
			role.setUpdatedDate(new Date());
			role.setUpdatedBy(((User)SecurityUtils.getSubject().getPrincipal()).getUserCode());
			roleDao.updateByPrimaryKeySelective(role);
			
			result.setSuccess(true);
			result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return result;
	}

	@Override
	public ReturnMsg deleteByIds(String ids) {
		ReturnMsg result = new ReturnMsg();
		if (ids.length() < 1) {
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.PARAM_IS_NULL.getMsg());
			result.setCode(GlobalMessageEnum.PARAM_IS_NULL.getCode());
			return result;
		}
		String[] idsArr = ids.split(",");
		try {
			roleDao.deleteByIds(idsArr);
			result.setSuccess(true);
			result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return result;
	}

	@Override
	public ReturnMsg addRole(RoleDto roleDto) {
		ReturnMsg result = new ReturnMsg();
		try {
			// 数据入库
			Role role = new Role();
			BeanCopyUtils.beanCopy(roleDto, role);
			role.setCreatedDate(new Date());
			role.setCreatedBy(((User)SecurityUtils.getSubject().getPrincipal()).getUserCode());
			
			String maxId = roleDao.getMaxRoleId();
			String strRoleID = StringUtils.leftPad((Integer.parseInt(maxId)+1)+"", 4, "0");
			role.setRoleId(strRoleID);
			
			int i = roleDao.insertSelective(role);
			if (i > 0) {
				result.setSuccess(true);
				result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
				result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
			}else {
				result.setSuccess(false);
				result.setMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getMsg());
				result.setCode(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getCode());
			}
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return result;
	}

	@Override
	public ReturnMsg getOneById(String id) {
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isNotBlank(id)) {
			Role role = roleDao.selectByPrimaryKey(id);
			if (role != null) {
				msg.setSuccess(true);
				msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
				msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
				msg.setData(role);
			}else {
				msg.setSuccess(false);
				msg.setCode(GlobalMessageEnum.DATABASE_NO_DATA.getCode());
				msg.setMessage(GlobalMessageEnum.DATABASE_NO_DATA.getMsg());
			}
		}else {
			msg.setSuccess(false);
			msg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_300.getMsg());
		}
		return msg;
	}


	public List<Role> getBindRoleByUserId(String userId){

		List<Role> roles = roleDao.selectBindRoleByUserId(userId);

		return roles;
	}
	
}
