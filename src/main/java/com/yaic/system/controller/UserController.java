package com.yaic.system.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
import com.yaic.system.dto.UserDto;
import com.yaic.system.entity.User;
import com.yaic.system.service.UserService;
import com.yaic.utils.ReturnMsgUtils;

@RestController
@RequestMapping("/user")
public class UserController {

private static Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;

	@PostMapping(value = "/list", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg getList(UserDto userDto) {
		logger.info("getList userDto_param:{}", JSON.toJSONString(userDto));
		Page<User> page = PageHelper.startPage(userDto.getPageNum(), userDto.getPageSize());
		List<User> list = userService.getList(userDto);
		ReturnMsg returnMsg = new ReturnMsg(true, GlobalMessageEnum.SYS_CODE_200.getCode(),GlobalMessageEnum.SYS_CODE_200.getMsg());
		if (list != null && list.size() > 0) {
			// 封装返回结果为统一格式JSON
			ReturnMsgData resultData = ReturnMsgUtils.getResults(page);
			returnMsg.setData(resultData);
		}
		return returnMsg;
	}

	@PostMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg updateInfo(@Valid UserDto userDto) {
		logger.info("update UserDto:{}", JSON.toJSONString(userDto));
		return userService.updateUser(userDto);
	}
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
	public ReturnMsg deleteInfo(@RequestParam(name="ids") String ids) {
		logger.info("delete ids:{}", ids);
		return userService.deleteByIds(ids);
	}
	
	@GetMapping(value="/getOne/{id}")
	public ReturnMsg getOne(@PathVariable String id){
		logger.info("get role by id:{}", id);
		return userService.getOneById(id);
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg addInfo(@Valid UserDto userDto) {
		logger.info("add UserDto:{}", JSON.toJSONString(userDto));
		return userService.addUser(userDto);
	}
}
