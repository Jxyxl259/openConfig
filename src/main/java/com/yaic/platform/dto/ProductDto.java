package com.yaic.platform.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

import com.yaic.common.BaseDto;

import javax.validation.constraints.Size;
import java.util.Date;

@ApiModel(value="ProductDto",description="产品数据传输DTO")
public class ProductDto extends BaseDto {
	
	@ApiModelProperty(value = "产品id", hidden=true)
    private Integer productId;

	@ApiModelProperty(value = "产品名称", name="productName")
    @NotBlank(message="产品名称不能为空")
    private String productName;

	@ApiModelProperty(value = "图片",hidden=true)
    private String productImg;

    @Size(min=1, max=1)
    @Range(min=0, max=1)
    @ApiModelProperty(value = "有效标识", name="productInvalid")
    private String productInvalid;

    @ApiModelProperty(value = "产品备注", name="productRemark",required = false)
    private String productRemark;

    @NotBlank(message="详情页 div Html代码不能为空")
    @ApiModelProperty(value = "产品详情页 div Html代码", name="productDivHtml")
    private String productDivHtml;

    @ApiModelProperty(value = "备用字段Aa", hidden=true)
    private String productFiledAa;

    @ApiModelProperty(hidden=true)
    private Date createdDate;

    @ApiModelProperty(value = "创建人", name="createdUser", hidden=true)
    private String createdUser;

    @ApiModelProperty(hidden=true)
    private Date updateDate;

    @ApiModelProperty(hidden=true)
    private String updatedUser;

    @ApiModelProperty(value = "产品介绍", name="productTxt",required = false)
    private String productTxt;

    /** 修改前的图片路径(如果涉及图片修改，需要删除原图片) */
    private String picFileNameBeforeModified;

	public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg == null ? null : productImg.trim();
    }

    public String getProductInvalid() {
        return productInvalid;
    }

    public void setProductInvalid(String productInvalid) {
        this.productInvalid = productInvalid == null ? null : productInvalid.trim();
    }

    public String getProductRemark() {
        return productRemark;
    }

    public void setProductRemark(String productRemark) {
        this.productRemark = productRemark == null ? null : productRemark.trim();
    }

    public String getProductDivHtml() {
        return productDivHtml;
    }

    public void setProductDivHtml(String productDivHtml) {
        this.productDivHtml = productDivHtml == null ? null : productDivHtml.trim();
    }

    public String getProductFiledAa() {
        return productFiledAa;
    }

    public void setProductFiledAa(String productFiledAa) {
        this.productFiledAa = productFiledAa == null ? null : productFiledAa.trim();
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

    public String getPicFileNameBeforeModified() {
        return picFileNameBeforeModified;
    }

    public void setPicFileNameBeforeModified(String picFileNameBeforeModified) {
        this.picFileNameBeforeModified = picFileNameBeforeModified;
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

    public String getProductTxt() {
        return productTxt;
    }

    public void setProductTxt(String productTxt) {
        this.productTxt = productTxt == null ? null : productTxt.trim();
    }
}