package com.yaic.platform.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;

import java.util.Date;

/**
 * @ClassName: PartnerAddDto
 * @Description: 合作商信息添加Dto
 * @author: jiangxy
 * @date: 2018-07-19 19:34
 * 
 */
@ApiModel(value = "partnerAddDto", discriminator = "合作商信息添加Dto")
public class PartnerAddDto {


	/** 合作方名称*/
	@NotBlank(message="合作方名称不能为空")
	@ApiModelProperty(value = "partnerName", notes = "合作方名称", required = true)
	private String partnerName;

	/** 合作方资源图片*/
	private String partnerImg;

	/** 有效标识 1:有效  0:无效*/
	@NotBlank(message="合作方有效标识不能为空")
	@ApiModelProperty(value = "partnerInvalid", notes = "合作方有效标识 1:有效 0:无效", required = true)
	private String partnerInvalid;

	/** 合作商备注 描述*/
	@ApiModelProperty(value = "partnerRemark", notes = "合作商备注")
	private String partnerRemark;

	/** 备用字段*/
	@ApiModelProperty(value = "partnerFieldAa", notes = "备用字段")
	private String partnerFieldAa;

	/** 创建时间*/
	@ApiModelProperty(hidden = true)
	private Date createdDate;

	/** 创建人*/
	@NotBlank(message="创建人不能为空")
	@ApiModelProperty(value = "createdUser", notes = "创建人")
	private String createdUser;


	public PartnerAddDto(String partnerName, String partnerImg, String partnerInvalid, String partnerRemark, String partnerFieldAa, Date createdDate, String createdUser) {
		this.partnerName = partnerName;
		this.partnerImg = partnerImg;
		this.partnerInvalid = partnerInvalid;
		this.partnerRemark = partnerRemark;
		this.partnerFieldAa = partnerFieldAa;
		this.createdDate = createdDate;
		this.createdUser = createdUser;
	}

	public PartnerAddDto() {
		super();
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName == null ? null : partnerName.trim();
	}

	public String getPartnerImg() {
		return partnerImg;
	}

	public void setPartnerImg(String partnerImg) {
		this.partnerImg = partnerImg == null ? null : partnerImg.trim();
	}

	public String getPartnerInvalid() {
		return partnerInvalid;
	}

	public void setPartnerInvalid(String partnerInvalid) {
		this.partnerInvalid = partnerInvalid == null ? null : partnerInvalid.trim();
	}

	public String getPartnerRemark() {
		return partnerRemark;
	}

	public void setPartnerRemark(String partnerRemark) {
		this.partnerRemark = partnerRemark == null ? null : partnerRemark.trim();
	}

	public String getPartnerFieldAa() {
		return partnerFieldAa;
	}

	public void setPartnerFieldAa(String partnerFieldAa) {
		this.partnerFieldAa = partnerFieldAa == null ? null : partnerFieldAa.trim();
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
		this.createdUser = createdUser == null ? null : createdUser.trim();
	}

}