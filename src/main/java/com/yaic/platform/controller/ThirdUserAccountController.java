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

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.common.ReturnMsgData;
import com.yaic.platform.dto.ThirdUserDto;
import com.yaic.platform.entity.ThirdUser;
import com.yaic.platform.service.ThirdUserAccountService;
import com.yaic.utils.ReturnMsgUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;


@Api(value = "ThirdUserAccountController", description = "第三方用户接口")
@RestController
@RequestMapping("/userAccount")
public class ThirdUserAccountController{

	private Logger logger = LoggerFactory.getLogger(ThirdUserAccountController.class);

	@Autowired
	private ThirdUserAccountService accountService;
	
	@ApiOperation(value = "用户列表", notes="用户列表")
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public ReturnMsg getThirdPartyAccountList(ThirdUserDto thirdUserDto){
		
		logger.debug("getPartnerList userAccount_param:{}", JSON.toJSONString(thirdUserDto));

		Page<ThirdUser> page = PageHelper.startPage(thirdUserDto.getPageNum(), thirdUserDto.getPageSize());
		accountService.getList(thirdUserDto);

		// 封装返回结果为统一格式JSON
		ReturnMsgData resultData = ReturnMsgUtils.getResults(page);
		ReturnMsg returnMsg = new ReturnMsg(true, GlobalMessageEnum.SYS_CODE_200.getCode(),GlobalMessageEnum.SYS_CODE_200.getMsg(), resultData);

		return returnMsg;

	}

	@ApiOperation(value = "第三方用户修改", notes = "第三方用户修改")
	@RequestMapping(value = "/modifyUserAccountInfo", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ReturnMsg modifyThirdPartyUserInfo(@Valid @RequestBody ThirdUserDto thirdUserDto){
		logger.debug("modifyThirdUser param:{}", JSON.toJSONString(thirdUserDto));
		return accountService.modifyAccountInfoByAccountId(thirdUserDto);
		
	}	
	
	@ApiOperation(value = "第三方用户删除", notes = "第三方用户删除")
	@ApiImplicitParam(name = "accountIds", value = "多个用户id使用\",\"隔开", required = true)
	@RequestMapping(value = "/deleteByIds", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
	public ReturnMsg deleteThirdPartyUserInfo(@RequestParam(name="accountIds") String accountIds) {
		logger.debug("deletePartnerInfo accountIds:{}", accountIds);
		return accountService.deleteByIds(accountIds);
	}

}