package com.yaic.platform.service.impl;

import com.alibaba.fastjson.JSON;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ImgUploadConstant;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.dao.PartnerDao;
import com.yaic.platform.dto.PartnerAddDto;
import com.yaic.platform.dto.PartnerDeleteDto;
import com.yaic.platform.dto.PartnerListDto;
import com.yaic.platform.dto.PartnerModifyDto;
import com.yaic.platform.entity.Partner;
import com.yaic.platform.service.PartnerService;
import org.apache.commons.beanutils.ConvertUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import static com.yaic.common.CommonConstant.PARTNER_MODULE;
import static com.yaic.common.GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED;
import static com.yaic.common.GlobalMessageEnum.FILE_UPLOAD_FAILURE;
import static com.yaic.platform.common.PublicMethods.delProductImg;

@Service
public class PartnerServiceImpl implements PartnerService {

	private static Logger log = LoggerFactory.getLogger(PartnerServiceImpl.class);

	@Autowired
	private PartnerDao partnerDao;

	@Autowired
	private ImgUploadConstant fileUploadPath;

	@Override
	public List<Partner> getList(PartnerListDto partnerListDto) {
		log.debug("Query PartnerList param={}", JSON.toJSONString(partnerListDto));
		List<Partner> list = partnerDao.selectList(partnerListDto);
		log.debug("Query PartnerList result={}", JSON.toJSONString(list));
		return list;
	}

	@Override
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> modifyPartnerInfoByPartnerId(PartnerModifyDto partnerModifyDto, MultipartFile partnerImageFile) {
		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);
		log.debug("Update PartnerInfo partnerModifyDto:{}", JSON.toJSONString(partnerModifyDto));

		String imgPathNew="";
		if(partnerImageFile != null){
			String imgPath = partnerModifyDto.getPartnerImage();
			String partnerName = partnerModifyDto.getPartnerName();
			imgPathNew = updateProductImg(imgPath, partnerImageFile, partnerName);
		}

		partnerModifyDto.setUpdateDate(new Date());
		partnerModifyDto.setPartnerImage(imgPathNew);
		int affectRows = partnerDao.updateByPrimaryKeySelective(partnerModifyDto);
		log.debug("Update PartnerInfo affectedRows={}", affectRows);

		if(1 != affectRows){
			delProductImg(imgPathNew);
			return result.resetResultMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED);
		}

		result.setT(affectRows);
		return result;
	}

	/**
	 * 更新合作方图片
	 * @param partnerImagePathBeforeModified 合作方图片路径（修改前）
	 * @param partnerImageFile 合作方图片（新）
	 * @param partnerName 合作方名称（新）
	 * @return imageAbsolutePath 合作方图片路径（新）
	 */
	private String updateProductImg(String partnerImagePathBeforeModified, MultipartFile partnerImageFile, String partnerName) {
		delProductImg(partnerImagePathBeforeModified);

		String originalFilename = partnerImageFile.getOriginalFilename();
		String imageAbsolutePath = fileUploadPath.getUploadFileAbsolutePath(originalFilename, partnerName, PARTNER_MODULE);

		try {
			FileOutputStream fos = new FileOutputStream(new File(imageAbsolutePath));
			FileCopyUtils.copy(partnerImageFile.getInputStream(), fos);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return imageAbsolutePath;
	}


	@Override
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> deleteByIds(PartnerDeleteDto partnerDeleteDto) {
		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);
		String partnerIds = partnerDeleteDto.getIds();
		String partnerImageFilePath = partnerDeleteDto.getPartnerImageFilePath();
		log.debug("Delete PartnerInfo Ids={}, partnerImageFilePath={}", partnerIds, partnerImageFilePath);

		delProductImg(partnerImageFilePath);

		String[] ids = partnerIds.split(",");
		int[] idArr = (int[]) ConvertUtils.convert(ids,int.class);
		int affectedRows = partnerDao.deleteByIds(idArr);

		if(ids.length != affectedRows){
			log.error("Delete from DateBase Failure !!!");
			return result.resetResultMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED);
		}

		result.setT(affectedRows);
		log.debug("Delete PartnerInfo affectedRows={}", affectedRows);
		return result;
	}


	@Override
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> addPartner(PartnerAddDto partnerAddDto, MultipartFile partnerImageFile) {
		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);
		log.debug("Add PartnerInfo Param={}", JSON.toJSONString(partnerAddDto));

		// 将文件上传到指定的路径
		String originalFilename = partnerImageFile.getOriginalFilename();
		String partnerName = partnerAddDto.getPartnerName();
		String uploadFileAbsolutePath = fileUploadPath.getUploadFileAbsolutePath(originalFilename, partnerName, PARTNER_MODULE);

		int affectRows = -1;
		try {
			FileOutputStream fos = new FileOutputStream(new File(uploadFileAbsolutePath));
			FileCopyUtils.copy(partnerImageFile.getInputStream(), fos);

			partnerAddDto.setCreatedDate(new Date());
			partnerAddDto.setPartnerImg(uploadFileAbsolutePath);

			// 数据入库
			affectRows = partnerDao.insert(partnerAddDto);
			if(affectRows != 1){
				log.error("Insert Into DateBase Failure !!!");
				delProductImg(uploadFileAbsolutePath);
				return new ResultMessage<>(DATABASE_INTERACTIVE_FAILED);
			}
			result.setT(affectRows);
		} catch (IOException e) {
			log.error("File Upload Failure!!! Reason={}", e.getCause());
			e.printStackTrace();
			result.resetResultMessage(FILE_UPLOAD_FAILURE);
		}

		log.debug("Add PartnerInfo affectedRows={}", affectRows);
		return result;
	}


}