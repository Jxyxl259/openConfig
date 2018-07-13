package com.yaic.platform.product_module.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.BaseInfo;
import com.yaic.platform.common.FileUpLoadPathConstant;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.partner_module.entity.Partner;
import com.yaic.platform.product_module.entity.Product;
import com.yaic.platform.product_module.entity.ProductAddDto;
import com.yaic.platform.product_module.entity.ProductModifyDto;
import com.yaic.platform.product_module.service.ProductService;
import org.apache.commons.beanutils.ConvertUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import static com.yaic.common.Constant.NO_PAGENATION;
import static com.yaic.common.Constant.PRODUCT_MODULE;
import static com.yaic.platform.common.BaseController.getResults;
import static com.yaic.platform.common.PublicMethods.checkUpLoadImg;

@RestController
@RequestMapping("/product")
public class ProductController {

	private static Logger log = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private ProductService productService;

	@Autowired
	private FileUpLoadPathConstant fileUploadPath;

	@RequestMapping("/list")
	public ResultMessage getProductList(@RequestBody Product product){
		log.debug("getProductList param:{}", JSON.toJSONString(product));

		boolean queryAll = false;

		if (StringUtils.isEmpty(product)) {
			product = new Product();
		}

		if(NO_PAGENATION.equals(product.getPageSize())){
			queryAll = true;
		}

		Page<Partner> page = PageHelper.startPage(product.getPageNum(), product.getPageSize(), true, true, queryAll);
		List<Product> partnerList = productService.getList(product);

		// 封装返回结果为统一格式JSON
		ResultMessage result = getResults(page);

		log.debug("getProductList result:{}", JSON.toJSONString(result));
		return result;
	}


	@RequestMapping("/deleteByIds")
	public ResultMessage<Integer> deleteProductInfo(String productIds){
		log.debug("deleteProductInfo param:{}", productIds);

		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);

		if(StringUtils.isEmpty(productIds)){
			result.resetResultMessage(GlobalMessageEnum.PARAM_IS_NULL);
			return result;
		}

		String[] ids = productIds.split(",");
		int[] strArrNum = (int[]) ConvertUtils.convert(ids,int.class);

		int affectedRows = productService.deleteByIds(strArrNum);

		if(ids.length != affectedRows){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		result.setT(affectedRows);

		log.debug("deleteProductInfo result:{}", result);
		return result;
	}


	// todo @RequestBody注解
	@RequestMapping("/modifyProductInfo")
	public ResultMessage modifyProductInfo(@RequestBody /*// TODO 开发最后阶段加数据校验@Valid*/ ProductModifyDto productModifyDtoModule,
	                                       BindingResult bindingResult){
		log.debug("modifyProductInfo param:{}", productModifyDtoModule);

		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);

		int affectRows = productService.modifyPartnerInfoByPartnerId(productModifyDtoModule);

		if(1 != affectRows){
			result.resetResultMessage(GlobalMessageEnum.FAILED);
		}

		result.setT(affectRows);

		log.debug("modifyProductInfo result:{}", result);
		return result;
	}



	@RequestMapping(value = "/addProductInfo", method = { RequestMethod.POST})
	public ResultMessage addProductInfo(/*// TODO 开发最后阶段加数据校验@Valid*/ ProductAddDto productAddDtoModule,
	                                    @RequestParam("productImageFile")MultipartFile productImageFile,
	                                    HttpServletRequest request,
	                                    BindingResult bindingResult){
		log.debug("modifyProductInfo param [ ProductAddDto :{}, multipartFile :{} ]", JSON.toJSONString(productAddDtoModule), productImageFile);

		ResultMessage result = new ResultMessage(GlobalMessageEnum.SUCCESS);

		// 图片检查
		BaseInfo baseInfo = checkUpLoadImg(productImageFile);
		if(!baseInfo.getSuccess()){
			log.debug("Upload Product File Failure, Reason={}", baseInfo.getResult().getResultMsg());
			return baseInfo.getResult();
		}

		// 将文件上传到指定的路径
		String originalFilename = productImageFile.getOriginalFilename();
		String productName = productAddDtoModule.getProductName();
		String uploadFileAbsolutePath = fileUploadPath.getUploadFileAbsolutePath(originalFilename, productName, PRODUCT_MODULE);

		try {
			FileOutputStream fos = new FileOutputStream(new File(uploadFileAbsolutePath));
			FileCopyUtils.copy(productImageFile.getInputStream(), fos);
		} catch (IOException e) {
			log.error("File Upload Failure!!! Reason={}", e.getCause());
			e.printStackTrace();
		}

		// 数据入库
		int afectRows = productService.addProductInfo(productAddDtoModule);

		return result;
	}


}