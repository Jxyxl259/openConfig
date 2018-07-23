package com.yaic.platform.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.yaic.platform.dao.ThirdUserDao;
import com.yaic.platform.entity.ThirdUser;
import com.yaic.platform.service.ThirdUserAccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ThirdUserAccountServiceImpl implements ThirdUserAccountService {

	private Logger log = LoggerFactory.getLogger(ThirdUserAccountServiceImpl.class);

	@Autowired
	private ThirdUserDao thirdUserAccountDao;


	@Override
	public List<ThirdUser> getList(ThirdUser accountModel) {
		log.debug("Query ThirdUserAccountInfoList Param={} ",JSONObject.toJSONString(accountModel));
		List<ThirdUser> accountInfoList = thirdUserAccountDao.selectList(accountModel);
		log.debug("Query ThirdUserAccountInfoList result={} ",JSONObject.toJSONString(accountInfoList));
		return accountInfoList ;
	}

	@Override
	public int modifyAccountInfoByAccountId(ThirdUser accountModel) {
		log.debug("modifyAccountInfoByAccountId Param={} ",JSONObject.toJSONString(accountModel));
		int affectedRows = thirdUserAccountDao.updateByPrimaryKeySelective(accountModel);
		log.debug("modifyAccountInfoByAccountId affectedRows={} ",affectedRows);
		return affectedRows;
	}

	@Override
	public int deleteByIds(int[] strArrNum) {
		log.debug("deleteByIds Param={} ",strArrNum);
		int affectRows = thirdUserAccountDao.deleteByIds(strArrNum);
		log.debug("deleteByIds affectedRows={} ",affectRows);
		return affectRows;
	}
}