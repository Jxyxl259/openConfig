package com.yaic.system.service.impl;

import java.util.Date;
import java.util.List;

import com.yaic.common.CommonConstant;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dao.UserDao;
import com.yaic.system.dto.UserDto;
import com.yaic.system.entity.User;
import com.yaic.system.service.UserService;
import com.yaic.utils.BeanCopyUtils;
import com.yaic.utils.UuidUtils;

import static com.yaic.common.CommonConstant.loginUser.ALGORITHM_NAME;
import static com.yaic.common.CommonConstant.loginUser.HASH_ITERATIONS;

@Service
public class UserServiceImpl implements UserService {

	private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public List<User> getList(UserDto userDto) {
		// 数据获取
		User user = new User();
		BeanCopyUtils.beanCopy(userDto, user);
		return userDao.selectList(user);
	}

	@Override
	public ReturnMsg updateUser(UserDto userDto) {
		ReturnMsg result = new ReturnMsg();
		try {
			// 数据入库
			User user = new User();
			BeanCopyUtils.beanCopy(userDto, user);
			user.setUpdatedDate(new Date());
			// TODO 待用户登录功能实现后再完善
			user.setUpdatedBy("admin");
			userDao.updateByPrimaryKeySelective(user);
			
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
			userDao.deleteByIds(idsArr);
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
	public ReturnMsg addUser(UserDto userDto) {
		ReturnMsg result = new ReturnMsg();
		try {
			// 数据入库
			User user = new User();
			BeanCopyUtils.beanCopy(userDto, user);
			user.setPassword(encryptPassword(userDto));
			user.setCreatedDate(new Date());
			user.setCreatedBy(((User)SecurityUtils.getSubject().getPrincipal()).getUserCode());

			String userId = "";
			User emp_user = null;
			do{
				userId = UuidUtils.getUuidByLength(20);
				emp_user = userDao.selectByPrimaryKey(userId);
			}while(emp_user != null);

			user.setUserId(userId);

			int i = userDao.insertSelective(user);
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


	/**
	 * 对密码进行加密
	 * @param userDto
	 * @return
	 */
	private String encryptPassword(UserDto userDto) {

		ByteSource salt = ByteSource.Util.bytes(userDto.getUserCode() + "sns");

		SimpleHash sh = new SimpleHash(ALGORITHM_NAME, userDto.getPassword(), salt, HASH_ITERATIONS);

		return sh.toString();
	}


	@Override
	public ReturnMsg getOneById(String id) {
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isNotBlank(id)) {
			User user = userDao.selectByPrimaryKey(id);
			if (user != null) {
				msg.setSuccess(true);
				msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
				msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
				msg.setData(user);
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



	@Override
	public User getUserInfoByUserCode(String userCode) {
		logger.info("getInfoByUserCode userCode={}", userCode);
		return userDao.getInfoByUserCode(userCode);
	}


}
