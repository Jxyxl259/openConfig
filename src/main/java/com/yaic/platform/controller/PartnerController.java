package com.yaic.platform.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.platform.common.BaseController;
import com.yaic.platform.common.BaseInfo;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.dto.PartnerAddDto;
import com.yaic.platform.dto.PartnerDeleteDto;
import com.yaic.platform.dto.PartnerListDto;
import com.yaic.platform.dto.PartnerModifyDto;
import com.yaic.platform.entity.Partner;
import com.yaic.platform.service.PartnerService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

import static com.yaic.common.CommonConstant.NO_PAGENATION;
import static com.yaic.common.GlobalMessageEnum.PARAM_ILLEGAL;
import static com.yaic.platform.common.PublicMethods.checkUpLoadImg;

@Api(value = "PartnerController", description = "合作方模块接口")
@RestController
@RequestMapping("/partner")
public class PartnerController extends BaseController {

	private Logger log = LoggerFactory.getLogger(PartnerController.class);

	@Autowired
	private PartnerService partnerService;


	/**
	 * 添加第三方合作伙伴
	 * @param partnerAddDto
	 * @param bindingResult
	 * @return
	 */
	@ApiOperation(value = "添加第三方合作伙伴", notes = "添加第三方合作伙伴")
	@RequestMapping(
			value = "/addPartnerInfo",
			method = RequestMethod.POST,
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResultMessage<Integer> addPartnerInfo(@Valid PartnerAddDto partnerAddDto,
	                                             @RequestParam("partnerImageFile") @ApiParam(value = "合作方图片",required = true) MultipartFile partnerImageFile,
	                                             BindingResult bindingResult){
		log.debug("addPartnerInfo partnerAddDto:{}, MultipartFile:{}", partnerAddDto, partnerImageFile);

		// 图片检查
		BaseInfo baseInfo = checkUpLoadImg(partnerImageFile);
		if(!baseInfo.getSuccess()){
			log.debug("Upload Partner File Failure, Reason={}", baseInfo.getResult().getResultMsg());
			return baseInfo.getResult();
		}

		ResultMessage<Integer> result = partnerService.addPartner(partnerAddDto, partnerImageFile);

		log.debug("addPartnerInfo result:{}", JSON.toJSONString(result));
		return result;
	}

	/**
	 * 获取第三方合作信息列表
	 * @param partnerListDto 包含分页信息及模糊查询信息
	 * @return
	 */
	@ApiOperation(value = "获取第三方合作商信息列表", notes = "获取第三方合作商信息列表")
	@RequestMapping(
			value = "/list",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResultMessage getPartnerList(@RequestBody PartnerListDto partnerListDto){
		log.debug("getPartnerList param:{}", JSON.toJSONString(partnerListDto));

		boolean queryAll = false;

		if (StringUtils.isEmpty(partnerListDto)) {
			partnerListDto = new PartnerListDto();
		}

		if(NO_PAGENATION.equals(partnerListDto.getPageSize())){
			queryAll = true;
		}

		Page<Partner> page = PageHelper.startPage(partnerListDto.getPageNum(), partnerListDto.getPageSize(), true, true, queryAll);
		List<Partner> partnerList = partnerService.getList(partnerListDto);

		// 封装返回结果为统一格式JSON
		ResultMessage result = getResults(page);

		log.debug("getPartnerList result:{}", JSON.toJSONString(result));
		return result;
	}


	/**
	 * 第三方合作商信息修改
	 * @param partnerModifyDto
	 * @param bindingResult
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@ApiOperation(value = "第三方合作商信息修改", notes = "第三方合作商信息修改")
	@RequestMapping(
			value = "/modifyPartnerInfo",
			method = RequestMethod.POST,
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResultMessage<Integer> modifyPartnerInfo(@Valid PartnerModifyDto partnerModifyDto,
	                                                @RequestParam("partnerImageFile") @ApiParam(name ="partnerImageFile", value = "合作方图片",required = false) MultipartFile partnerImageFile,
	                                                BindingResult bindingResult){
		log.debug("modifyPartnerInfo param:{}", JSON.toJSONString(partnerModifyDto));

		// 参数校验
		if(partnerImageFile != null){
			if(StringUtils.isEmpty(partnerModifyDto.getPartnerImage())){
				return getResults(PARAM_ILLEGAL.getResultCode(),"修改前图片文件路径不能为空");
			}
			BaseInfo baseInfo = checkUpLoadImg(partnerImageFile);
			if(!baseInfo.getSuccess()){
				log.debug("Upload Partner File Failure, Reason={}", baseInfo.getResult().getResultMsg());
				return baseInfo.getResult();
			}
		}

		ResultMessage<Integer> result = partnerService.modifyPartnerInfoByPartnerId(partnerModifyDto, partnerImageFile);

		log.debug("modifyPartnerInfo result:{}", result);
		return result;
	}


	/**
	 * 第三方合作商信息删除/批量删除
	 * @param partnerDeleteDto
	 * @return
	 */
	@ApiOperation(value = "第三方合作商信息删除", notes = "第三方合作商信息删除")
	@ApiImplicitParams({
			@ApiImplicitParam(
					name = "ids",
					value = "<h3>要删除的合作商ID</h3></br>" +
							"多个合作商ID使用英文\",\"隔开",
					required = true ,
					paramType = "form",
					dataType = "String"
			),
			@ApiImplicitParam(
					name = "partnerImageFilePath",
					value = "<h3>合作方图片路径</h3></br>" +
							"e.g : /fileUpload/img/product_img/xxx.jpg",
					required = true ,
					paramType = "form",
					dataType = "String")
	})
	@RequestMapping(
			value = "/deleteByIds",
			method = RequestMethod.POST,
			consumes = MediaType.ALL_VALUE)
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> deletePartnerInfo(@Valid PartnerDeleteDto partnerDeleteDto, BindingResult bindingResult){
		log.debug("deletePartnerInfo partnerDeleteDto:{}", JSON.toJSONString(partnerDeleteDto));

		ResultMessage<Integer> result = partnerService.deleteByIds(partnerDeleteDto);

		log.debug("deletePartnerInfo result:{}", result);
		return result;
	}


}