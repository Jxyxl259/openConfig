package com.yaic.platform.partner_module.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.BaseController;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.partner_module.entity.Partner;
import com.yaic.platform.partner_module.service.PartnerService;
import org.apache.commons.beanutils.ConvertUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

import static com.yaic.common.Constant.NO_PAGENATION;

@RestController
@RequestMapping("/partner")
public class PartnerController extends BaseController {

	private Logger log = LoggerFactory.getLogger(PartnerController.class);

	@Autowired
	private PartnerService partnerService;


	@RequestMapping("/addPartnerInfo")
	public ResultMessage<Integer> addPartnerInfo(@Valid @RequestBody Partner partner, BindingResult bindingResult){
		log.debug("addPartnerInfo param:{}", partner);

		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);

		int i = partnerService.addPartner(partner);

		if(1 != i){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		result.setT(i);
		log.debug("addPartnerInfo result:{}", JSON.toJSONString(result));

		return result;
	}

	@RequestMapping("/list")
	public ResultMessage getPartnerList(@RequestBody Partner partner){
		log.debug("getPartnerList param:{}", JSON.toJSONString(partner));

		boolean queryAll = false;

		if (StringUtils.isEmpty(partner)) {
			partner = new Partner();
		}

		if(NO_PAGENATION.equals(partner.getPageSize())){
			queryAll = true;
		}

		Page<Partner> page = PageHelper.startPage(partner.getPageNum(), partner.getPageSize(), true, true, queryAll);
		List<Partner> partnerList = partnerService.getList(partner);

		// 封装返回结果为统一格式JSON
		ResultMessage result = getResults(page);

		log.debug("getPartnerList result:{}", JSON.toJSONString(result));
		return result;
	}

	@RequestMapping("/modifyPartnerInfo")
	public ResultMessage<Integer> modifyPartnerInfo(@Valid @RequestBody Partner partner, BindingResult bindingResult){
		log.debug("modifyPartnerInfo param:{}", JSON.toJSONString(partner));

		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);

		int affectRows = partnerService.modifyPartnerInfoByPartnerId(partner);

		if(1 != affectRows){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		result.setT(affectRows);

		log.debug("modifyPartnerInfo result:{}", result);
		return result;
	}

	@RequestMapping("/deleteByIds")
	public ResultMessage<Integer> deletePartnerInfo(String partnerIds){
		log.debug("deletePartnerInfo param:{}", partnerIds);

		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);

		if(StringUtils.isEmpty(partnerIds)){
			result.resetResultMessage(GlobalMessageEnum.PARAM_IS_NULL);
			return result;
		}


		String[] ids = partnerIds.split(",");
		int[] strArrNum = (int[]) ConvertUtils.convert(ids,int.class);

		int affectedRows = partnerService.deleteByIds(strArrNum);

		if(ids.length != affectedRows){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		result.setT(affectedRows);

		log.debug("deletePartnerInfo result:{}", result);
		return result;
	}


}