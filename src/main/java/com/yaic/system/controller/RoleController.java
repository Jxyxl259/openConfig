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
import com.yaic.system.dto.RoleDto;
import com.yaic.system.entity.Role;
import com.yaic.system.service.RoleService;
import com.yaic.utils.ReturnMsgUtils;

@RestController
@RequestMapping("/role")
public class RoleController {
	
	private static Logger logger = LoggerFactory.getLogger(RoleController.class);
	
	@Autowired
	private RoleService roleService;

	/**
	 * @Title: getPartnerList
	 * @Description: 获取当前节点下的所有子资源节点，异步获取数据节点方法
	 * @param parentId
	 * @return
	 * @return: ReturnMsg
	 */
	@PostMapping(value = "/list", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg getList(RoleDto roleDto) {
		logger.info("getList roleDto_param:{}", JSON.toJSONString(roleDto));
		Page<Role> page = PageHelper.startPage(roleDto.getPageNum(), roleDto.getPageSize());
		List<Role> list = roleService.getList(roleDto);
		ReturnMsg returnMsg = new ReturnMsg(true, GlobalMessageEnum.SYS_CODE_200.getCode(),GlobalMessageEnum.SYS_CODE_200.getMsg());
		if (list != null && list.size() > 0) {
			// 封装返回结果为统一格式JSON
			ReturnMsgData resultData = ReturnMsgUtils.getResults(page);
			returnMsg.setData(resultData);
		}
		return returnMsg;
	}

	@GetMapping(value = "/all")
	public ReturnMsg getMenuList() {
		ReturnMsg returnMsg = new ReturnMsg(true, GlobalMessageEnum.SYS_CODE_200.getCode(),GlobalMessageEnum.SYS_CODE_200.getMsg());
		returnMsg.setData(roleService.getAll());
		return returnMsg;
	}
	
	@PostMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg updateInfo(@Valid RoleDto roleDto) {
		logger.info("update RoleDto:{}", JSON.toJSONString(roleDto));
		return roleService.updateRole(roleDto);
	}
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
	public ReturnMsg deletePartnerInfo(@RequestParam(name="ids") String ids) {
		logger.info("delete ids:{}", ids);
		return roleService.deleteByIds(ids);
	}
	
	@GetMapping(value="/getOne/{id}")
	public ReturnMsg getOne(@PathVariable String id){
		logger.info("get role by id:{}", id);
		return roleService.getOneById(id);
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg addInfo(@Valid RoleDto roleDto) {
		logger.info("add RoleDto:{}", JSON.toJSONString(roleDto));
		return roleService.addRole(roleDto);
	}
	
	
}
