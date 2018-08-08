package com.yaic.platform.dto;

import java.util.Date;

import org.hibernate.validator.constraints.NotBlank;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "PartnerDto", description = "合作方数据传输DTO")
public class PartnerDto extends BaseDto{

	/** 合作方ID */
	@ApiModelProperty(value = "partnerId", notes = "合作方ID")
	private Integer partnerId;
	
	/** 合作方名称*/
	@NotBlank(message="合作方名称不能为空")
	@ApiModelProperty(value = "partnerName", notes = "合作方名称", required = true)
	private String partnerName;

	/** 合作方资源图片*/
	@ApiModelProperty(value = "partnerImg", notes = "合作方图片资源")
	private String partnerImg;

	/** 有效标识 1:有效  0:无效*/
	@ApiModelProperty(value = "partnerInvalid", notes = "合作方有效标识 1:有效 0:无效")
	private String partnerInvalid;

	/** 合作商备注 描述*/
	@ApiModelProperty(value = "partnerRemark", notes = "合作商备注")
	private String partnerRemark;

	/** 备用字段*/
	@ApiModelProperty(value = "partnerFieldAa", notes = "备用字段")
	private String partnerFieldAa;

	/** 创建时间*/
	@ApiModelProperty(hidden=true, value="createdDate", notes="创建时间")
	private Date createdDate;

	/** 创建人*/
	@ApiModelProperty(hidden=true, value="createdUser", notes="创建人")
	private String createdUser;

	/** 修改前的图片路径(如果涉及图片修改，需要删除原图片) */
	private String picFileNameBeforeModified;
	
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

	public String getPartnerImg() {
		return partnerImg;
	}

	public void setPartnerImg(String partnerImg) {
		this.partnerImg = partnerImg;
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

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(String createdUser) {
		this.createdUser = createdUser;
	}

	public String getPicFileNameBeforeModified() {
		return picFileNameBeforeModified;
	}

	public void setPicFileNameBeforeModified(String picFileNameBeforeModified) {
		this.picFileNameBeforeModified = picFileNameBeforeModified;
	}
}


