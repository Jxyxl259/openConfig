package com.yaic.platform.partner_module.service.impl;

import com.alibaba.fastjson.JSON;
import com.yaic.platform.partner_module.dao.PartnerDao;
import com.yaic.platform.partner_module.entity.Partner;
import com.yaic.platform.partner_module.service.PartnerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PartnerServiceImpl implements PartnerService {

	private static Logger log = LoggerFactory.getLogger(PartnerServiceImpl.class);

	@Autowired
	private PartnerDao partnerDao;

	@Override
	public List<Partner> getList(Partner partnerModule) {
		log.debug("Query PartnerList param={}", JSON.toJSONString(partnerModule));
		List<Partner> list = partnerDao.selectList(partnerModule);
		log.debug("Query PartnerList result={}", JSON.toJSONString(list));
		return list;
	}

	@Override
	public int modifyPartnerInfoByPartnerId(Partner partnerModule) {
		log.debug("Update PartnerInfo Param:{}", JSON.toJSONString(partnerModule));
		partnerModule.setUpdateDate(new Date());
		int i = partnerDao.updateByPrimaryKeySelective(partnerModule);
		log.debug("Update PartnerInfo affectedRows={}", i);
		return i;
	}

	@Override
	public int deleteByIds(int[] strArrNum) {
		log.debug("Delete PartnerInfo Ids={}", strArrNum);
		int i = partnerDao.deleteByIds(strArrNum);
		log.debug("Delete PartnerInfo affectedRows={}", i);
		return i;
	}

	@Override
	public int addPartner(Partner partner) {
		log.debug("Add PartnerInfo Param={}", JSON.toJSONString(partner));
		partner.setCreatedDate(new Date());
		int i = partnerDao.insert(partner);
		log.debug("Add PartnerInfo affectedRows={}", i);
		return i;
	}
}