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
@ApiModel(value = "PartnerDeleteDto", description = "合作伙伴信息删除Dto")
public class PartnerDeleteDto extends BaseIdsDto {

	@NotBlank(message = "合作商图片路径不能为空")
	@ApiModelProperty(hidden = true)
	private String partnerImageFilePath;

	public PartnerDeleteDto() {}

	public PartnerDeleteDto(String ids, String partnerImageFilePath) {
		super(ids);
		this.partnerImageFilePath = partnerImageFilePath;
	}

	public String getPartnerImageFilePath() {
		return partnerImageFilePath;
	}

	public void setPartnerImageFilePath(String partnerImageFilePath) {
		this.partnerImageFilePath = partnerImageFilePath;
	}
}