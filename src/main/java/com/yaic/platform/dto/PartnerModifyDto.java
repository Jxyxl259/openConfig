package com.yaic.platform.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

/**
 * @ClassName: PartnerModifyDto
 * @Description: 合作商修改请求Dto
 * @author: jiangxy
 * @date: 2018-07-19 19:28
 * 
 */
@ApiModel(value = "partnerModifyDto", description = "合作商修改请求Dto")
public class PartnerModifyDto {

	/**
	 * 产品ID
	 */
	@ApiModelProperty(value = "partnerId", notes = "产品ID", required = true)
	private Integer partnerId;

	/**
	 * 产品名称
	 */
	@ApiModelProperty(value = "partnerName", notes = "产品名称")
	private String partnerName;

	/**
	 * 产品图片路径
	 */
	@ApiModelProperty(value = "partnerImage", notes = "当前合作方图片路径（当且仅当重新上传合作方图片时需要此参数）")
	private String partnerImage;

	/**
	 * 产品有效标识
	 */
	@ApiModelProperty(value = "partnerInvalid", notes = "产品有效标识", required = true)
	private String partnerInvalid;

	/**
	 * 产品备注
	 */
	@ApiModelProperty(value = "partnerRemark", notes = "产品备注")
	private String partnerRemark;

	/**
	 * 备用字段
	 */
	@ApiModelProperty(value = "partnerFieldAa", notes = "备用字段")
	private String partnerFieldAa;

	/**
	 * 更新人
	 */
	@ApiModelProperty(value = "updatedUser", notes = "更新人", required = true)
	private String updatedUser;

	/**
	 * 更新时间
	 */
	@ApiModelProperty(hidden = true)
	private Date updateDate;

	
	public PartnerModifyDto() {
	}

	public PartnerModifyDto(Integer partnerId, String partnerName, String partnerImage, String partnerInvalid, String partnerRemark, String partnerFieldAa, String updatedUser, Date updateDate) {
		this.partnerId = partnerId;
		this.partnerName = partnerName;
		this.partnerImage = partnerImage;
		this.partnerInvalid = partnerInvalid;
		this.partnerRemark = partnerRemark;
		this.partnerFieldAa = partnerFieldAa;
		this.updatedUser = updatedUser;
		this.updateDate = updateDate;
	}

	public Integer getPartnerId() {
		return partnerId;
	}

	public void setPartnerId(Integer partnerId) {
		this.partnerId = partnerId;
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getPartnerImage() {
		return partnerImage;
	}

	public void setPartnerImage(String partnerImage) {
		this.partnerImage = partnerImage;
	}

	public String getPartnerInvalid() {
		return partnerInvalid;
	}

	public void setPartnerInvalid(String partnerInvalid) {
		this.partnerInvalid = partnerInvalid;
	}

	public String getPartnerRemark() {
		return partnerRemark;
	}

	public void setPartnerRemark(String partnerRemark) {
		this.partnerRemark = partnerRemark;
	}

	public String getPartnerFieldAa() {
		return partnerFieldAa;
	}

	public void setPartnerFieldAa(String partnerFieldAa) {
		this.partnerFieldAa = partnerFieldAa;
	}

	public String getUpdatedUser() {
		return updatedUser;
	}

	public void setUpdatedUser(String updatedUser) {
		this.updatedUser = updatedUser;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
}

