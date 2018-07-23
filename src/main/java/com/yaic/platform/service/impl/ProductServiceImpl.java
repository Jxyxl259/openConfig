package com.yaic.platform.service.impl;

import com.alibaba.fastjson.JSON;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ImgUploadConstant;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.dao.ProductDao;
import com.yaic.platform.dto.ProductAddDto;
import com.yaic.platform.dto.ProductDeleteDto;
import com.yaic.platform.dto.ProductListDto;
import com.yaic.platform.dto.ProductModifyDto;
import com.yaic.platform.entity.Product;
import com.yaic.platform.service.ProductService;
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

import static com.yaic.common.CommonConstant.PRODUCT_MODULE;
import static com.yaic.common.GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED;
import static com.yaic.common.GlobalMessageEnum.FILE_UPLOAD_FAILURE;
import static com.yaic.platform.common.BaseController.getResults;
import static com.yaic.platform.common.PublicMethods.delProductImg;

@Service
public class ProductServiceImpl implements ProductService {

	private static Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

	@Autowired
	private ProductDao productDao;

	@Autowired
	private ImgUploadConstant fileUploadPath;

	@Override
	public List<Product> getList(ProductListDto productListDto) {
		log.debug("Query ProductList Param={}", JSON.toJSONString(productListDto));
		List<Product> productList = productDao.selectList(productListDto);
		log.debug("Query ProductList Result={}", JSON.toJSONString(productList));
		return productList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> deleteProductInfo(ProductDeleteDto deleteDto) {
		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);
		String productIds = deleteDto.getIds();
		String productImageFilePath = deleteDto.getProductImageFilePath();
		log.debug("Delete ProductInfo Ids={}, productImagePath={}", productIds, productImageFilePath);

		// 根据图片路径删除产品图片
		delProductImg(productImageFilePath);

		int[] ids = (int[]) ConvertUtils.convert(productIds.split(","),int.class);

		int affectedRows = productDao.deleteByIds(ids);

		if(ids.length != affectedRows){
			return result.resetResultMessage(DATABASE_INTERACTIVE_FAILED);
		}

		result.setT(affectedRows);
		log.debug("Delete PartnerInfo affectedRows={}", affectedRows);
		return result;
	}


	@Override
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> modifyPartnerInfoByPartnerId(ProductModifyDto productModifyDto, MultipartFile productImageFile) {
		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);
		log.debug("Update ProductInfo Param:{}", JSON.toJSONString(productModifyDto));

		String imgPathNew="";
		if(productImageFile != null){
			String imgPath = productModifyDto.getProductImage();
			String partnerName = productModifyDto.getProductName();
			imgPathNew = updateProductImg(imgPath, productImageFile, partnerName);
		}

		productModifyDto.setUpdateDate(new Date());
		productModifyDto.setProductImage(imgPathNew);
		int affectRows = productDao.updateByPrimaryKeySelective(productModifyDto);

		if(1 != affectRows){
			delProductImg(imgPathNew);
			return result.resetResultMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED);
		}

		result.setT(affectRows);
		return result;
	}


	/**
	 * 更新合作方图片
	 * @param productImagePathBeforeModified 产品图片路径（修改前）
	 * @param productImageFile 产品图片（新）
	 * @param productName 产品名称（新）
	 * @return imageAbsolutePath 合作方图片路径（新）
	 */
	private String updateProductImg(String productImagePathBeforeModified, MultipartFile productImageFile, String productName) {
		delProductImg(productImagePathBeforeModified);

		String originalFilename = productImageFile.getOriginalFilename();
		String imageAbsolutePath = fileUploadPath.getUploadFileAbsolutePath(originalFilename, productName, PRODUCT_MODULE);

		try {
			FileOutputStream fos = new FileOutputStream(new File(imageAbsolutePath));
			FileCopyUtils.copy(productImageFile.getInputStream(), fos);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return imageAbsolutePath;
	}
	@Override
	@SuppressWarnings("unchecked")
	public ResultMessage<Integer> addProductInfo(ProductAddDto productAddDto, MultipartFile productImageFile) {
		ResultMessage result = new ResultMessage(GlobalMessageEnum.SUCCESS);
		log.debug("Add ProductInfo Param:{}", JSON.toJSONString(productAddDto));

		// 将文件上传到指定的路径
		String originalFilename = productImageFile.getOriginalFilename();
		String productName = productAddDto.getProductName();
		String uploadFileAbsolutePath = fileUploadPath.getUploadFileAbsolutePath(originalFilename, productName, PRODUCT_MODULE);

		int afectRows = -1;
		try {
			FileOutputStream fos = new FileOutputStream(new File(uploadFileAbsolutePath));
			FileCopyUtils.copy(productImageFile.getInputStream(), fos);

			productAddDto.setCreatedDate(new Date());
			productAddDto.setProductImg(uploadFileAbsolutePath);

			// 数据入库
			afectRows = productDao.insertSelective(productAddDto);
			if(afectRows != 1){
				log.error("Insert Into DateBase Failure !!!");
				return getResults(DATABASE_INTERACTIVE_FAILED);
			}
			result.setT(afectRows);
		} catch (IOException e) {
			log.error("File Upload Failure!!! Reason={}", e.getCause());
			e.printStackTrace();
			return result.resetResultMessage(FILE_UPLOAD_FAILURE);
		}

		log.debug("Add ProductInfo affectedRows:{}", afectRows);
		return result;
	}


}