package com.yaic.platform.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.BaseInfo;
import com.yaic.platform.common.ResultMessage;
import com.yaic.platform.dto.ProductAddDto;
import com.yaic.platform.dto.ProductDeleteDto;
import com.yaic.platform.dto.ProductListDto;
import com.yaic.platform.dto.ProductModifyDto;
import com.yaic.platform.entity.Partner;
import com.yaic.platform.entity.Product;
import com.yaic.platform.service.ProductService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

import static com.yaic.common.CommonConstant.NO_PAGENATION;
import static com.yaic.common.GlobalMessageEnum.PARAM_ILLEGAL;
import static com.yaic.platform.common.BaseController.getResults;
import static com.yaic.platform.common.PublicMethods.checkUpLoadImg;

/**
 * @author : jiangxy
 * @create-date : 2018\7\16 
 * @create-time : 19:36
 */
@Api(value = "ProductController", description = "产品维护模块功能接口")
@RestController
@RequestMapping("/product")
public class ProductController {

	private static Logger log = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private ProductService productService;


	/**
	 * 获取产品信息列表
	 * @param productListDto
	 * @return
	 */
	@ApiOperation(value="产品信息列表", notes="产品信息列表")
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResultMessage getProductList(@RequestBody ProductListDto productListDto){
		log.debug("getProductList param:{}", JSON.toJSONString(productListDto));

		boolean queryAll = false;

		if (StringUtils.isEmpty(productListDto)) {
			productListDto = new ProductListDto();
		}

		if(NO_PAGENATION.equals(productListDto.getPageSize())){
			queryAll = true;
		}

		Page<Partner> page = PageHelper.startPage(productListDto.getPageNum(), productListDto.getPageSize(), true, true, queryAll);
		List<Product> partnerList = productService.getList(productListDto);

		// 封装返回结果为统一格式JSON
		ResultMessage result = getResults(page);

		log.debug("getProductList result:{}", JSON.toJSONString(result));
		return result;
	}


	/**
	 * 删除/批量删除产品信息
	 * @param productDeleteDto
	 * @return
	 */
	@ApiOperation(value="产品信息删除", notes="产品信息删除")
	@ApiImplicitParams({
			@ApiImplicitParam(
					name = "ids",
					value = "<h3>要删除的产品ID</h3></br>" +
							"多个产品ID使用英文\",\"隔开",
					required = true ,
					paramType = "form",
					dataType = "String"),
			@ApiImplicitParam(
					name = "productImageFilePath",
					value = "<h3>产品图片路径</h3></br>" +
							"e.g : /fileUpload/img/product_img/xxx.jpg",
					required = true ,
					paramType = "form",
					dataType = "String")
	})
	@RequestMapping(value = "/deleteByIds", method = RequestMethod.POST)
	public ResultMessage<Integer> deleteProductInfo(@Valid ProductDeleteDto productDeleteDto,
	                                                BindingResult bindingResult){
		ResultMessage<Integer> result = new ResultMessage<>(GlobalMessageEnum.SUCCESS);
		log.debug("deleteProductInfo productDeleteDto:{}", JSON.toJSONString(productDeleteDto));

		productService.deleteProductInfo(productDeleteDto);

		log.debug("deleteProductInfo result:{}", result);
		return result;
	}



	/**
	 * 修改产品信息
	 * @param productModifyDtoModule
	 * @param bindingResult
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@ApiOperation(value="产品信息修改", notes="产品信息修改")
	@RequestMapping(
			value = "/modifyProductInfo",
			method = RequestMethod.POST,
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResultMessage<Integer> modifyProductInfo(@Valid ProductModifyDto productModifyDtoModule,
	                                       @RequestParam("productImageFile") @ApiParam(name ="productImageFile", value = "产品图片",required = false)MultipartFile productImageFile,
	                                       BindingResult bindingResult){
		log.debug("modifyProductInfo param:{}", productModifyDtoModule);

		// 参数校验
		if(productImageFile != null){
			// 更换合作商图片，本次修改前的图片路径必传
			if(StringUtils.isEmpty(productModifyDtoModule.getProductImage())){
				return getResults(PARAM_ILLEGAL.getResultCode(),"修改前图片文件路径不能为空");
			}
			BaseInfo baseInfo = checkUpLoadImg(productImageFile);
			if(!baseInfo.getSuccess()){
				log.debug("Upload Partner File Failure, Reason={}", baseInfo.getResult().getResultMsg());
				return baseInfo.getResult();
			}
		}

		ResultMessage<Integer> result = productService.modifyPartnerInfoByPartnerId(productModifyDtoModule, productImageFile);

		log.debug("modifyProductInfo result:{}", result);
		return result;
	}


	/**
	 * 添加产品信息
	 * @param productAddDto
	 * @param productImageFile
	 * @param bindingResult
	 * @return
	 */
	@ApiOperation(value="产品信息添加", notes="产品信息添加")
	@RequestMapping(
			value = "/addProductInfo",
			method = RequestMethod.POST,
			consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,})
	public ResultMessage addProductInfo(@Valid ProductAddDto productAddDto,
	                                    @RequestParam("productImageFile") @ApiParam(value = "产品图片", required = true) MultipartFile productImageFile,
	                                    BindingResult bindingResult){
		log.debug("modifyProductInfo params [ ProductAddDto :{}, multipartFile :{} ]", JSON.toJSONString(productAddDto), productImageFile);

		// 图片检查
		BaseInfo baseInfo = checkUpLoadImg(productImageFile);
		if(!baseInfo.getSuccess()){
			log.debug("Upload Product File Failure, Reason={}", baseInfo.getResult().getResultMsg());
			return baseInfo.getResult();
		}

		ResultMessage<Integer> result = productService.addProductInfo(productAddDto, productImageFile);

		log.debug("addProductInfo result:{}", JSON.toJSONString(result));
		return result;
	}


}