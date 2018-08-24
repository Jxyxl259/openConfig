package com.yaic.platform.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.ConvertUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.dao.ThirdUserDao;
import com.yaic.platform.dto.ThirdUserDto;
import com.yaic.platform.entity.ThirdUser;
import com.yaic.platform.service.ThirdUserAccountService;
import com.yaic.utils.BeanCopyUtils;


@Service
public class ThirdUserAccountServiceImpl implements ThirdUserAccountService {

	private Logger logger = LoggerFactory.getLogger(ThirdUserAccountServiceImpl.class);

	@Autowired
	private ThirdUserDao thirdUserAccountDao;

	@Override
	public List<ThirdUser> getList(ThirdUserDto thirdUserDto) {
		// 数据获取
		ThirdUser thirdUser = new ThirdUser();
		BeanCopyUtils.beanCopy(thirdUserDto, thirdUser);
		return thirdUserAccountDao.selectList(thirdUser);
	}

	@Override
	public ReturnMsg modifyAccountInfoByAccountId(ThirdUserDto thirdUserDto) {
		ReturnMsg result = new ReturnMsg();
		try {
			// 数据入库
			ThirdUser thirdUser = new ThirdUser();
			BeanCopyUtils.beanCopy(thirdUserDto, thirdUser);
			thirdUser.setUpdatedDate(new Date());
			
			thirdUserAccountDao.updateByPrimaryKeySelective(thirdUser);
			
			result.setSuccess(true);
			result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		} catch (Exception e) {
			logger.error(GlobalMessageEnum.SYS_CODE_500.getMsg(), e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return result;
	}

	@Override
	public ReturnMsg deleteByIds(String accountIds) {
		ReturnMsg result = new ReturnMsg(true);
		result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
		result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		
		if (accountIds.length() < 1) {
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.PARAM_IS_NULL.getMsg());
			result.setCode(GlobalMessageEnum.PARAM_IS_NULL.getCode());
		}else {
			try {
				String[] ids = accountIds.split(",");
				int[] intIds = (int[]) ConvertUtils.convert(ids,int.class);
				thirdUserAccountDao.deleteByIds(intIds);
			} catch (Exception e) {
				result.setSuccess(false);
				result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
				result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
				logger.error(GlobalMessageEnum.SYS_CODE_500.getMsg(), e.getCause());
			}
		}
		return result;
	}
}