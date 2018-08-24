package com.yaic.system.service.impl;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.dao.ResourceDao;
import com.yaic.system.dto.ResourceDto;
import com.yaic.system.entity.Resource;
import com.yaic.system.service.ResourceService;
import com.yaic.utils.BeanCopyUtils;
import com.yaic.utils.IdGenerateUtils;

@Service
public class ResourceServiceImpl implements ResourceService{
	
	private Logger logger = LoggerFactory.getLogger(ResourceServiceImpl.class);
	
	@Autowired
	private ResourceDao resourceDao;

	@Override
	public ReturnMsg getListByPid(String parentId) {
		logger.info("current query menu node by parentId : {} ", parentId);
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isNotBlank(parentId)) {
			List<Resource> list = resourceDao.getListByPid(parentId);
			msg.setSuccess(true);
			msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			msg.setData(list);
		}else {
			msg.setSuccess(false);
			msg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_300.getMsg());
		}
		
		return msg;
	}


	@Override
	@SuppressWarnings("unchecked")
	public List<Resource> getBindResourceByRoleIds(String[] roleIds){
		if(roleIds.length == 0)
			return Collections.EMPTY_LIST;
		List<Resource> bindResources = resourceDao.selectResourcesByRoleIds(roleIds);
		return bindResources;
	}


	@Override
	public ReturnMsg getList() {
		ReturnMsg msg = new ReturnMsg();
		try {
			Resource resource = new Resource();
			List<Resource> list = resourceDao.selectAllBySelective(resource);
			
			msg.setSuccess(true);
			msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			msg.setData(list);
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			msg.setSuccess(false);
			msg.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			msg.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return msg;
	}



	@Override
	public ReturnMsg deleteById(String resourceId) {
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isNotBlank(resourceId)) {
			int count = resourceDao.deleteByPrimaryKey(resourceId);
			if (count > 0) {
				msg.setSuccess(true);
				msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
				msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			}else {
				msg.setSuccess(false);
				msg.setCode(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getCode());
				msg.setMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getMsg());
			}
		}else {
			msg.setSuccess(false);
			msg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_300.getMsg());
		}
		
		return msg;
	}
	

	@Override
	public ReturnMsg getOneById(String resourceId) {
		ReturnMsg msg = new ReturnMsg();
		if (StringUtils.isNotBlank(resourceId)) {
			Resource resource = resourceDao.selectByPrimaryKey(resourceId);
			if (resource != null) {
				msg.setSuccess(true);
				msg.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
				msg.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
				msg.setData(resource);
			}else {
				msg.setSuccess(false);
				msg.setCode(GlobalMessageEnum.DATABASE_NO_DATA.getCode());
				msg.setMessage(GlobalMessageEnum.DATABASE_NO_DATA.getMsg());
			}
		}else {
			msg.setSuccess(false);
			msg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
			msg.setMessage(GlobalMessageEnum.SYS_CODE_300.getMsg());
		}
		return msg;
	}

	
	@Override
	public ReturnMsg addResource(ResourceDto resourceDto) {
		ReturnMsg result = new ReturnMsg();
		int affectRows = -1;
		try {
			// 数据入库
			Resource resource = new Resource();
			BeanCopyUtils.beanCopy(resourceDto, resource);
			resource.setCreatedDate(new Date());
			// TODO 待用户登录功能实现后再完善
			resource.setCreatedBy("admin");
			//获取当前节点下最大的子节点的id
			String maxId = resourceDao.queryMaxIdByParentId(resource.getParentResourceId());
			String rid = IdGenerateUtils.generateId(resource.getParentResourceId(), maxId);
			short resourceLevel = (short) (rid.length() / 2);
			resource.setResourceId(rid);
			resource.setResourceLevel(resourceLevel);
			affectRows = resourceDao.insertSelective(resource);
			if(affectRows != 1){
				logger.error("Insert Into DateBase Failure !!!");
				result.setSuccess(false);
				result.setMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getMsg());
				result.setCode(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getCode());
			}else {
				//更新父节点类型是父节点，end_flag = 0;
				Resource parentResource = new Resource();
				parentResource.setResourceId(resource.getParentResourceId());
				parentResource.setEndFlag("0");
				resourceDao.updateByPrimaryKeySelective(parentResource);
				
				result.setSuccess(true);
				result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
				result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
			}
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return result;
	}

	@Override
	public ReturnMsg updateResource(ResourceDto resourceDto) {
		ReturnMsg result = new ReturnMsg();
		try {
			// 数据入库
			Resource resource = new Resource();
			BeanCopyUtils.beanCopy(resourceDto, resource);
			resource.setUpdatedDate(new Date());
			// TODO 待用户登录功能实现后再完善
			resource.setUpdatedBy("admin");
			resourceDao.updateByPrimaryKeySelective(resource);
			
			result.setSuccess(true);
			result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
		}
		return result;
	}
	
	

}
