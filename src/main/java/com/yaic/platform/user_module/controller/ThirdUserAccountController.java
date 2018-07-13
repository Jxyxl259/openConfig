package com.yaic.platform.user_module.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.BaseController;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.user_module.entity.ThirdUser;
import com.yaic.platform.user_module.service.ThirdUserAccountService;
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

import static com.yaic.common.Constant.NO_PAGENATION;

@RestController
@RequestMapping("/userAccount")
public class ThirdUserAccountController extends BaseController {

	private Logger log = LoggerFactory.getLogger(ThirdUserAccountController.class);

	@Autowired
	private ThirdUserAccountService accountService;

	@RequestMapping("/list")
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

	@RequestMapping("/modifyUserAccountInfo")
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

	@RequestMapping("/deleteByIds")
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