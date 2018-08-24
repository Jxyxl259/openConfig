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
import com.yaic.platform.dao.ProductDao;
import com.yaic.platform.dto.ProductDto;
import com.yaic.platform.entity.Product;
import com.yaic.platform.service.ProductService;
import com.yaic.utils.BeanCopyUtils;
import com.yaic.utils.ImageUtils;

@Service
public class ProductServiceImpl implements ProductService {

	private static Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
	
	@Value("${imgUploadConfig.product-image-file}")
	private String productImageFilePath;

	@Autowired
	private ProductDao productDao;

	@Override
	public List<Product> getList(ProductDto productDto) {
		// 数据获取
		Product product = new Product();
		BeanCopyUtils.beanCopy(productDto, product);
		return productDao.selectList(product);
	}

	@Override
	public ReturnMsg deleteByIds(String deleteIds) {
		ReturnMsg result = new ReturnMsg();
		if (deleteIds.length() < 1) {
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.PARAM_IS_NULL.getMsg());
			result.setCode(GlobalMessageEnum.PARAM_IS_NULL.getCode());
			return result;
		}
		String[] ids = deleteIds.split(",");
		int[] intIds = (int[]) ConvertUtils.convert(ids,int.class);
		
		List<Product> lists = productDao.selectListByKeys(intIds);
		if (intIds.length != lists.size()) {
			logger.error("that's size is not equals query's length, so this delete is failure !!!");
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.DELETE_OPERATION_6001.getMsg());
			result.setCode(GlobalMessageEnum.DELETE_OPERATION_6001.getCode());
			return result;
		}
		
		productDao.deleteByIds(intIds);

		//删除对应图片资源
		for (Product product : lists) {
			String image = product.getProductImg();
			if (StringUtils.isNotBlank(image)) {
				ImageUtils.deleteImageByPath(productImageFilePath+File.separator+image);
			}
		}
		
		result.setSuccess(true);
		result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
		result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		return result;
	}

	@Override
	public ReturnMsg updateProductInfo(ProductDto productDto, MultipartFile productImageFile) {
		ReturnMsg result = new ReturnMsg();
		try {
			String fileName = null;
			if (productImageFile != null) {
				fileName = ImageUtils.fileCopy(productImageFile, productImageFilePath);
				if (StringUtils.isEmpty(fileName)) { //这里直接返回null或者文件名称
					result.setSuccess(false);
					result.setMessage(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getMsg());
					result.setCode(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getCode());
					return result;
				}
				ImageUtils.deleteImageByPath(productImageFilePath + File.separator + productDto.getPicFileNameBeforeModified());
			}

			// 数据入库
			Product product = new Product();
			BeanCopyUtils.beanCopy(productDto, product);
			product.setUpdateDate(new Date());
			product.setUpdatedUser("admin");
			product.setProductImg(fileName);

			productDao.updateByPrimaryKeySelective(product);

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
	public ReturnMsg addProductInfo(ProductDto productDto, MultipartFile productImageFile) {
		ReturnMsg result = new ReturnMsg(true);
		result.setMessage(GlobalMessageEnum.SYS_CODE_200.getMsg());
		result.setCode(GlobalMessageEnum.SYS_CODE_200.getCode());
		
		int affectRows = -1;
        String fileName = null;
		try {
			
			fileName = ImageUtils.fileCopy(productImageFile, productImageFilePath);
			if (StringUtils.isEmpty(fileName)) { //这里直接返回null或者文件名称
				result.setSuccess(false);
				result.setMessage(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getMsg());
				result.setCode(GlobalMessageEnum.FILE_UPLOAD_FAILURE.getCode());
				return result;
			}
			
			// 数据入库
			Product product = new Product();
			BeanCopyUtils.beanCopy(productDto, product);
			product.setCreatedDate(new Date());
            // TODO 待用户登录功能实现后再完善
            product.setCreatedUser("admin");
			product.setProductImg(fileName);
			
			affectRows = productDao.insertSelective(product);
			
			if(affectRows != 1){
				logger.error("Insert Into DateBase Failure !!!");
				ImageUtils.deleteImageByPath(ImageUtils.getUploadFileAbsolutePath(fileName, productImageFilePath));
				result.setSuccess(false);
				result.setMessage(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getMsg());
				result.setCode(GlobalMessageEnum.DATABASE_INTERACTIVE_FAILED.getCode());
                ImageUtils.deleteImageByPath(productImageFilePath + File.separator + fileName);

            }
		} catch (Exception e) {
			logger.error("Exception Failure!!! Reason={}", e.getCause());
			result.setSuccess(false);
			result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
			result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
			ImageUtils.deleteImageByPath(productImageFilePath + File.separator + fileName);
		}
		return result;
	}



}