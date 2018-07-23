package com.yaic.platform.dto;

import com.yaic.platform.common.BaseIdsDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @Description: 合作商信息删除Dto
 * @author: jiangxy
 * @date: 2018\7\20 0020 13:59
 */
@ApiModel(value = "ProductDeleteDto", description = "合作伙伴信息删除Dto")
public class ProductDeleteDto extends BaseIdsDto {

	@NotBlank(message = "合作商图片不能为空")
	@ApiModelProperty(hidden = true)
	private String productImageFilePath;

	public ProductDeleteDto() {}

	public ProductDeleteDto(String ids, String productImageFilePath) {
		super(ids);
		this.productImageFilePath = productImageFilePath;
	}

	public String getProductImageFilePath() {
		return productImageFilePath;
	}

	public void setProductImageFilePath(String productImageFilePath) {
		this.productImageFilePath = productImageFilePath;
	}
}