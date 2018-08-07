package com.yaic.platform.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.dto.PartnerDto;
import com.yaic.platform.entity.Partner;

public interface PartnerService {

	/** 合作方列表*/
	List<Partner> getList(PartnerDto partnerDto);

	/** 修改合作方信息*/
	ReturnMsg modifyPartnerInfoByPartnerId(PartnerDto partnerDto, MultipartFile partnerImageFile);

	/** 删除合作方信息*/
	ReturnMsg deleteByIds(String ids);

	/** 添加合作方信息*/
	ReturnMsg addPartner(PartnerDto partnerDto, MultipartFile partnerImgFile);


}
