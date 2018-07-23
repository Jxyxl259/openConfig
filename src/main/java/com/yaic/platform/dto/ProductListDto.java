package com.yaic.platform.dto;

import com.yaic.platform.common.BaseDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @ClassName: 产品列表展示请求Dto
 * @Description: 
 * @author: jiangxy
 * @date: 2018-07-19 19::10
 * 
 */
@ApiModel(value="productListDto",description="产品列表查询Dto")
public class ProductListDto extends BaseDto {


	/**
	 * 产品名称
	 */
	@ApiModelProperty(value = "产品名称", name="productName")
	private String productName;

	/**
	 * 有效标识 1：已认证 0：未认证
	 */
	@ApiModelProperty(value = "有效标识", name="productInvalid")
	private String productInvalid;

	/**
	 * 创建人
	 */
	@ApiModelProperty(value = "创建人", name="createdUser")
	private String createdUser;


	public ProductListDto() {
		super();
	}


	public ProductListDto(int pageSize, int pageNum, String productName, String createdUser, String productInvalid){
		super.setPageSize(pageSize);
		super.setPageNum(pageNum);
		this.productName = productName;
		this.createdUser = createdUser;
		this.productInvalid = productInvalid;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductInvalid() {
		return productInvalid;
	}

	public void setProductInvalid(String productInvalid) {
		this.productInvalid = productInvalid;
	}

	public String getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(String createdUser) {
		this.createdUser = createdUser;
	}
}