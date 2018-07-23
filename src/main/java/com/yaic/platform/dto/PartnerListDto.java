package com.yaic.platform.dto;

import com.yaic.platform.common.BaseDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @lassName: 合作方列表Dto
 * @Description: 
 * @author: jiangxy
 * @date: 2018-07-19 17:50
 */
@ApiModel(value = "PartnerListDto", description = "合作方列表请求Dto")
public class PartnerListDto extends BaseDto {

	/**
	 * 合作商名称
	 */
	@ApiModelProperty(value = "partnerName", notes = "合作商名称")
	private String partnerName;

	/**
	 * 合作商是否有效
	 */
	@ApiModelProperty(value = "partnerInvalid", notes = "合作方是否有效标识")
	private String partnerInvalid;

	/**
	 * 创建人
	 */
	@ApiModelProperty(value = "createdUser", notes = "创建人")
	private String createdUser;

}