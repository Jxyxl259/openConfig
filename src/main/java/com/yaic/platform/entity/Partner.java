package com.yaic.platform.entity;

import com.yaic.platform.common.BaseDto;
import io.swagger.annotations.ApiModel;
import org.hibernate.validator.constraints.NotBlank;

import java.util.Date;

/**
 * 合作商
 */
@ApiModel(value = "partner", description = "合作商POJO")
public class Partner extends BaseDto {

    /** 主键*/
    private Integer partnerId;

    /** 合作方名称*/
    private String partnerName;

    /** 合作方资源图片*/
    private String partnerImg;

    /** 有效标识 1:有效  0:无效*/
    private String partnerInvalid;

    /** 备注 描述*/
    private String partnerRemark;

    /** 备用字段*/
    private String partnerFieldAa;

    /** 创建时间*/
    private Date createdDate;

    /** 创建人*/
    private String createdUser;

    /** 更新时间*/
    private Date updateDate;

    /** 更新人*/
    private String updatedUser;

    public Partner(Integer partnerId, String partnerName, String partnerImg, String partnerInvalid, String partnerRemark, String partnerFieldAa, Date createdDate, String createdUser, Date updateDate, String updatedUser) {
        this.partnerId = partnerId;
        this.partnerName = partnerName;
        this.partnerImg = partnerImg;
        this.partnerInvalid = partnerInvalid;
        this.partnerRemark = partnerRemark;
        this.partnerFieldAa = partnerFieldAa;
        this.createdDate = createdDate;
        this.createdUser = createdUser;
        this.updateDate = updateDate;
        this.updatedUser = updatedUser;
    }

    public Partner() {
        super();
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

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getUpdatedUser() {
        return updatedUser;
    }

    public void setUpdatedUser(String updatedUser) {
        this.updatedUser = updatedUser == null ? null : updatedUser.trim();
    }
}