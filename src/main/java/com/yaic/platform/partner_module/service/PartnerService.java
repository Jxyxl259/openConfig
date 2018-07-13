package com.yaic.platform.partner_module.service;

import com.yaic.platform.partner_module.entity.Partner;

import java.util.List;

public interface PartnerService {

	/**
	 * 合作方列表
	 * @param partner
	 * @return
	 */
	List<Partner> getList(Partner partner);

	/**
	 * 修改合作方信息
	 * @param partner
	 * @return
	 */
	int modifyPartnerInfoByPartnerId(Partner partner);

	/**
	 * 删除合作方信息
	 * @param strArrNum
	 * @return
	 */
	int deleteByIds(int[] strArrNum);


	/**
	 * 添加合作方信息
	 * @param partner
	 * @return
	 */
	int addPartner(Partner partner);
}
