package com.yaic.platform.service;

import com.yaic.platform.common.ResultMessage;

import com.yaic.platform.dto.PartnerAddDto;
import com.yaic.platform.dto.PartnerDeleteDto;
import com.yaic.platform.dto.PartnerListDto;
import com.yaic.platform.dto.PartnerModifyDto;
import com.yaic.platform.entity.Partner;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PartnerService {

	/**
	 * 合作方列表
	 * @param partner
	 * @return
	 */
	List<Partner> getList(PartnerListDto partner);

	/**
	 * 修改合作方信息
	 * @param partnerModifyDto
	 * @param partnerImageFile
	 * @return
	 */
	ResultMessage<Integer> modifyPartnerInfoByPartnerId(PartnerModifyDto partnerModifyDto, MultipartFile partnerImageFile);

	/**
	 * 删除合作方信息
	 * @param partnerDeleteDto
	 * @return
	 */
	ResultMessage<Integer> deleteByIds(PartnerDeleteDto partnerDeleteDto);


	/**
	 * 添加合作方信息
	 * @param partner
	 * @return
	 */
	ResultMessage<Integer> addPartner(PartnerAddDto partner, MultipartFile partnerImgFile);
}
