package com.yaic.platform.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.platform.common.ReturnMsgData;
import com.yaic.platform.dto.ProductDto;
import com.yaic.platform.entity.Partner;
import com.yaic.platform.service.ProductService;
import com.yaic.platform.utils.ImageUtils;
import com.yaic.platform.utils.ReturnMsgUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api(value = "ProductController", description = "产品维护模块功能接口")
@RestController
@RequestMapping("/product")
public class ProductController {

	private static Logger logger = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private ProductService productService;

	@ApiOperation(value = "产品信息列表", notes = "产品信息列表")
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ReturnMsg getProductList(ProductDto productDto) {

		logger.debug("getList productDto_param:{}", JSON.toJSONString(productDto));

		Page<Partner> page = PageHelper.startPage(productDto.getPageNum(), productDto.getPageSize());
		productService.getList(productDto);

		// 封装返回结果为统一格式JSON
		ReturnMsgData resultData = ReturnMsgUtils.getResults(page);
		ReturnMsg returnMsg = new ReturnMsg(true, GlobalMessageEnum.SYS_CODE_200.getCode(),
				GlobalMessageEnum.SYS_CODE_200.getMsg(), resultData);

		return returnMsg;
	}

	@ApiOperation(value = "产品信息删除", notes = "产品信息删除")
	@ApiImplicitParam(name = "ids", value = "<h3>要删除的产品ID</h3></br>多个产品ID使用英文\\\",\\\"隔开", required = true)
	@RequestMapping(value = "/deleteByIds", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
	public ReturnMsg deleteProductInfo(@RequestParam(name = "ids") String ids) {
		logger.debug("deleteProductInfo ids:{}", ids);
		return productService.deleteByIds(ids);
	}

	
	@ApiOperation(value = "产品信息修改", notes = "产品信息修改")
	@RequestMapping(value = "/modifyProductInfo", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg modifyProductInfo(@Valid ProductDto productDto,
			@RequestParam(value = "productImageFile", required = false) @ApiParam(name = "partnerImageFile", value = "合作方图片", required = false) MultipartFile productImageFile) {

		logger.debug("modifyProductInfo param:{}", JSON.toJSONString(productDto));

		if (productImageFile != null) {
			ReturnMsg msg = ImageUtils.checkUpLoadImg(productImageFile);
			if (!msg.isSuccess()) {
				return msg;
			}
		}
		// 上传到指定图片路径和保存数据库数据
		return productService.updateProductInfo(productDto, productImageFile);
	}
	

	@ApiOperation(value = "产品信息添加", notes = "产品信息添加")
	@RequestMapping(value = "/addProductInfo", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg addProductInfo(@Valid ProductDto productDto,
			@RequestParam("productImageFile") @ApiParam(value = "产品图片", required = true) MultipartFile productImageFile) {

		logger.info("addProductInfo productDto:{}, MultipartFile:{}", JSON.toJSONString(productDto), productImageFile);

		ReturnMsg msg = ImageUtils.checkUpLoadImg(productImageFile);
		if (!msg.isSuccess()) {
			return msg;
		}
		// 上传到指定图片路径和保存数据库数据
		return productService.addProductInfo(productDto, productImageFile);
	}

}