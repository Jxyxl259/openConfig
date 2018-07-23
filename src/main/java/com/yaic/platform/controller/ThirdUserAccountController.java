package com.yaic.platform.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.BaseController;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.entity.ThirdUser;
import com.yaic.platform.service.ThirdUserAccountService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.beanutils.ConvertUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.yaic.common.CommonConstant.NO_PAGENATION;

@Api(value = "ThirdUserAccountController", description = "第三方用户接口")
@RestController
@RequestMapping("/userAccount")
public class ThirdUserAccountController extends BaseController {

	private Logger log = LoggerFactory.getLogger(ThirdUserAccountController.class);

	@Autowired
	private ThirdUserAccountService accountService;

	/**
	 * 用户列表
	 * @param userAccount
	 * @return
	 */
	@ApiOperation(value = "用户列表", notes="用户列表")
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResultMessage getThirdPartyAccountList(@RequestBody ThirdUser userAccount){
		log.debug("getThirdPartyAccountList param:{}", userAccount);

		boolean queryAll = false;

		if (StringUtils.isEmpty(userAccount)) {
			userAccount = new ThirdUser();
		}

		if(NO_PAGENATION.equals(userAccount.getPageSize())){
			queryAll = true;
		}

		Page<ThirdUser> page = PageHelper.startPage(userAccount.getPageNum(), userAccount.getPageSize(), true, true, queryAll);
		accountService.getList(userAccount);

		// 封装返回结果为统一格式JSON
		ResultMessage result = getResults(page);

		log.debug("getThirdPartyAccountList result:{}", JSON.toJSONString(result));
		return result;
	}


	/**
	 * 用户修改
	 * @param userAccount
	 * @param bindingResult
	 * @return
	 */
	@ApiOperation(value = "第三方用户修改", notes = "第三方用户修改")
	@RequestMapping(value = "/modifyUserAccountInfo", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResultMessage modifyThirdPartyUserInfo(@Valid @RequestBody ThirdUser userAccount, BindingResult bindingResult){
		log.debug("modifyThirdPartyUserInfo param:{}", userAccount);

		ResultMessage result = new ResultMessage(GlobalMessageEnum.SUCCESS);

		int affectRows = accountService.modifyAccountInfoByAccountId(userAccount);

		if(1 != affectRows){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		log.debug("modifyThirdPartyUserInfo result:{}", result);
		return result;
	}


	/**
	 * 用户删除/批量删除
	 * @param accountIds
	 * @return
	 */
	@ApiOperation(value = "第三方用户删除", notes = "第三方用户删除")
	@ApiImplicitParams(
			@ApiImplicitParam(
					name = "accountIds",
					value = "多个用户id使用\",\"隔开",
					required = true,
					paramType = "query"
			)
	)
	@RequestMapping(value = "/deleteByIds", method = RequestMethod.GET)
	public ResultMessage deleteThirdPartyUserInfo(String accountIds){
		log.debug("modifyThirdPartyUserInfo param:{}", accountIds);

		ResultMessage result = new ResultMessage(GlobalMessageEnum.SUCCESS);

		if(StringUtils.isEmpty(accountIds)){
			result.resetResultMessage(GlobalMessageEnum.PARAM_IS_NULL);
			return result;
		}


		String[] ids = accountIds.split(",");
		int[] strArrNum = (int[]) ConvertUtils.convert(ids,int.class);

		int affectedRows = accountService.deleteByIds(strArrNum);

		if(ids.length != affectedRows){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		log.debug("deleteThirdPartyUserInfo result:{}", result);
		return result;
	}

}