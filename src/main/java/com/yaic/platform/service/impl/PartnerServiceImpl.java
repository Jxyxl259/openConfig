package com.yaic.platform.service.impl;

import java.io.File;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.dao.PartnerDao;
import com.yaic.platform.dto.PartnerDto;
import com.yaic.platform.entity.Partner;
import com.yaic.platform.service.PartnerService;
import com.yaic.platform.utils.BeanCopyUtils;
import com.yaic.platform.utils.ImageUtils;

@Service
public class PartnerServiceImpl implements PartnerService {

	private static Logger logger = LoggerFactory.getLogger(PartnerServiceImpl.class);
	
	@Value("${imgUploadConfig.partner-image-file}")
	private String partnerImageFilePath;
	
	@Autowired
	private PartnerDao partnerDao;

	

	@Override
	public ReturnMsg modifyPartnerInfoByPartnerId(PartnerDto partnerDto, MultipartFile partnerImageFile) {	
		ReturnMsg result = new ReturnMsg();
		try {
			Partner partner = new Partner();
			String fileName = null;
			
			if (partnerImageFile != null && StringUtils.isNotBlank(partnerImageFile.getOriginalFilename())) {
				ReturnMsg msg = ImageUtils.checkUpLoadImg(partnerImageFile);
				if (!msg.isSuccess()) {
					return msg;
				}else {
					fileName = ImageUtils.fileCopy(partnerImageFile, partnerImageFilePath);
					if (StringUtils.isEmpty(fileName)) { //这里直接返回null或者文件名称
						result.setSuccess(false);
						result.setMessage(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getMsg());
						result.setCode(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getCode());
						return result;
					}
				}
			}
			
			// 数据入库
			BeanCopyUtils.beanCopy(partnerDto, partner);
			partner.setUpdateDate(new Date());
			partner.setPartnerImg(fileName);
			
			partnerDao.updateByPrimaryKeySelective(partner);
			
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


	@Override
	public List<Partner> getList(PartnerDto partnerDto) {
		// 数据获取
		Partner partner = new Partner();
		BeanCopyUtils.beanCopy(partnerDto, partner);
		return partnerDao.selectList(partner);
	}

	@Override
	public ReturnMsg deleteByIds(String partnerIds) {
		ReturnMsg result = new ReturnMsg();
		if (partnerIds.length() < 1) {
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.PARAM_IS_NULL.getMsg());
			result.setCode(GlobalMessageEnum.PARAM_IS_NULL.getCode());
			return result;
		}
		String[] ids = partnerIds.split(",");
		int[] intIds = (int[]) ConvertUtils.convert(ids,int.class);
		
		List<Partner> partnerLists = partnerDao.selectListByKeys(intIds);
		if (intIds.length != partnerLists.size()) {
			logger.error("that's size is not equals query's length, so this delete is failure !!!");
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.DELETE_OPERATION_6001.getMsg());
			result.setCode(GlobalMessageEnum.DELETE_OPERATION_6001.getCode());
			return result;
		}
		
		partnerDao.deleteByIds(intIds);

		//删除对应图片资源
		for (Partner partner : partnerLists) {
			String image = partner.getPartnerImg();
			if (StringUtils.isNotBlank(image)) {
				ImageUtils.deleteImageByPath(partnerImageFilePath+File.separator+image);
			}
		}
		
		result.setSuccess(true);
		result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
		result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		return result;
	}
	
	@Override
	public ReturnMsg addPartner(PartnerDto partnerDto, MultipartFile partnerImageFile) {
		ReturnMsg result = new ReturnMsg(true);
		result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
		result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		
		int affectRows = -1;
		try {
			String fileName = null;
			if (partnerImageFile != null && StringUtils.isNotBlank(partnerImageFile.getOriginalFilename())) {
				ReturnMsg msg = ImageUtils.checkUpLoadImg(partnerImageFile);
				if (!msg.isSuccess()) {
					return msg;
				}else {
					fileName = ImageUtils.fileCopy(partnerImageFile, partnerImageFilePath);
					if (StringUtils.isEmpty(fileName)) { //这里直接返回null或者文件名称
						result.setSuccess(false);
						result.setMessage(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getMsg());
						result.setCode(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getCode());
						return result;
					}
				}
			}
			
			
			// 数据入库
			Partner partner = new Partner();
			BeanCopyUtils.beanCopy(partnerDto, partner);
			partner.setCreatedDate(new Date());
			partner.setPartnerImg(fileName);
			
			affectRows = partnerDao.insertSelective(partner);
			
			if(affectRows != 1){
				logger.error("Insert Into DateBase Failure !!!");
				ImageUtils.deleteImageByPath(ImageUtils.getUploadFileAbsolutePath(fileName, partnerImageFilePath));
				result.setSuccess(false);
				result.setMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getMsg());
				result.setCode(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getCode());
			}
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
			
		}
		return result;
	}

	
}