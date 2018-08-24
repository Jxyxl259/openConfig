package com.yaic.system.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.service.UserRoleService;

@RestController
@RequestMapping("/userRole")
public class UserRoleController {

	private static Logger logger = LoggerFactory.getLogger(UserRoleController.class);
	
	@Autowired
	private UserRoleService userRoleService;
	
	@PostMapping(value = "/add", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ReturnMsg addInfo(@RequestParam(name="userId") String userId, @RequestParam(name="roleIds") String roleIds) {
		logger.info("add info     userId:{},  roleIds{}", userId, roleIds);
		return userRoleService.addInfo(userId, roleIds);
	}
	
	@GetMapping(value = "/get/{userId}")
	public ReturnMsg getBindRoleByUserId(@PathVariable String userId) {
		logger.info("getBindRoleByUserId    userId:{}", userId);
		return userRoleService.getBindRoleByUserId(userId);
	}
}
