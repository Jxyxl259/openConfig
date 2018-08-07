package com.yaic.platform.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.common.ReturnMsgData;
import com.yaic.platform.dto.PartnerDto;
import com.yaic.platform.entity.Partner;
import com.yaic.platform.service.PartnerService;
import com.yaic.platform.utils.ReturnMsgUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "PartnerController", description = "合作方模块接口")
@RestController
@RequestMapping("/partner")
public class PartnerController {

	private Logger logger = LoggerFactory.getLogger(PartnerController.class);

	@Autowired
	private PartnerService partnerService;

	@ApiOperation(value = "添加第三方合作伙伴", notes = "添加第三方合作伙伴")
	@RequestMapping(value = "/addPartnerInfo", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg addPartnerInfo(@Valid PartnerDto partnerDto,
			@RequestParam("partnerImageFile") @ApiParam(value = "合作方图片", required = true) MultipartFile partnerImageFile) {

		logger.info("addPartnerInfo PartnerDto:{}", JSON.toJSONString(partnerDto));
		
		// 上传到指定图片路径和保存数据库数据
		return partnerService.addPartner(partnerDto, partnerImageFile);
	}

	@ApiOperation(value = "获取第三方合作商信息列表", notes = "获取第三方合作商信息列表")
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ReturnMsg getPartnerList(@RequestBody PartnerDto partnerDto) {

		logger.info("getPartnerList PartnerDto_param:{}", JSON.toJSONString(partnerDto));

		Page<Partner> page = PageHelper.startPage(partnerDto.getPageNum(), partnerDto.getPageSize());
		partnerService.getList(partnerDto);

		// 封装返回结果为统一格式JSON
		ReturnMsgData resultData = ReturnMsgUtils.getResults(page);
		ReturnMsg returnMsg = new ReturnMsg(true, GlobalMessageEnum.SYS_CODE_200.getCode(),GlobalMessageEnum.SYS_CODE_200.getMsg(), resultData);

		return returnMsg;
	}

	@ApiOperation(value = "第三方合作商信息删除", notes = "第三方合作商信息删除")
	@ApiImplicitParam(name = "ids", value = "<h3>要删除的合作商ID</h3></br>多个合作商ID使用英文\\\",\\\"隔开", required = true)
	@RequestMapping(value = "/deleteByIds", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
	public ReturnMsg deletePartnerInfo(@RequestParam(name="ids") String ids) {
		logger.info("deletePartnerInfo ids:{}", ids);
		return partnerService.deleteByIds(ids);
	}

	@ApiOperation(value = "第三方合作商信息修改", notes = "第三方合作商信息修改")
	@RequestMapping(value = "/modifyPartnerInfo", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg modifyPartnerInfo(@Valid PartnerDto partnerDto,
			@RequestParam(value = "partnerImageFile", required = false) @ApiParam(name = "partnerImageFile", value = "合作方图片", required = false) MultipartFile partnerImageFile) {

		logger.info("modifyPartnerInfo param:{}", JSON.toJSONString(partnerDto));

		// 上传到指定图片路径和保存数据库数据
		return partnerService.modifyPartnerInfoByPartnerId(partnerDto, partnerImageFile);
	}

}