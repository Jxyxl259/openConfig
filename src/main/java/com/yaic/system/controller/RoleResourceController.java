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
import com.yaic.system.service.RoleResourceService;

@RestController
@RequestMapping("/roleResource")
public class RoleResourceController {

	private static Logger logger = LoggerFactory.getLogger(RoleResourceController.class);
	
	@Autowired
	private RoleResourceService roleResourceService;
	
	@PostMapping(value = "/add", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ReturnMsg addInfo(@RequestParam(name="roleId") String roleId, @RequestParam(name="resourceIds") String resourceIds) {
		logger.info("add info     roleID:{},  resourceIds{}", roleId,resourceIds);
		return roleResourceService.addInfo(roleId, resourceIds);
	}
	
	@GetMapping(value = "/get/{roleId}")
	public ReturnMsg getBindResourceByRoleId(@PathVariable String roleId) {
		logger.info("getBindResourceByRoleId    roleID:{}", roleId);
		return roleResourceService.getBindResourceByRoleId(roleId);
	}
}
