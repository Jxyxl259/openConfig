package com.yaic.platform.entity;

import com.yaic.platform.common.BaseDto;

import java.util.Date;

public class Product extends BaseDto {
    /**
     * 产品ID
     */
    private Integer productId;

    /**
     * 产品名称
     */
    private String productName;

    /**
     * 产品图片路径
     */
    private String productImg;

    /**
     * 有效标识 1：已认证 0：未认证
     */
    private String productInvalid;

    /**
     * 产品备注
     */
    private String productRemark;

    /**
     * 产品详情页 div Html代码
     */
    private String productDivHtml;

    /**
     * 备用字段Aa
     */
    private String productFiledAa;

    /**
     * 创建时间
     */
    private Date createdDate;

    /**
     * 创建人
     */
    private String createdUser;

    /**
     * 更新时间
     */
    private Date updateDate;

    /**
     * 更新人
      */
    private String updatedUser;

    /**
     * 产品介绍
     */
    private String productTxt;

    public Product(int pageSize, int pageNum, String productName, String createdUser, String productInvalid){
        super.setPageSize(pageSize);
        super.setPageNum(pageNum);
        this.productName = productName;
        this.createdUser = createdUser;
        this.productInvalid = productInvalid;
    }

    public Product(Integer productId, String productName, String productImg, String productInvalid, String productRemark, String productDivHtml, String productFiledAa, Date createdDate, String createdUser, Date updateDate, String updatedUser) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.productInvalid = productInvalid;
        this.productRemark = productRemark;
        this.productDivHtml = productDivHtml;
        this.productFiledAa = productFiledAa;
        this.createdDate = createdDate;
        this.createdUser = createdUser;
        this.updateDate = updateDate;
        this.updatedUser = updatedUser;
        //this.productTxt = productTxt;
    }

    public Product(Integer productId, String productName, String productImg, String productInvalid, String productRemark, String productDivHtml, String productFiledAa, Date createdDate, String createdUser, Date updateDate, String updatedUser, String productTxt) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.productInvalid = productInvalid;
        this.productRemark = productRemark;
        this.productDivHtml = productDivHtml;
        this.productFiledAa = productFiledAa;
        this.createdDate = createdDate;
        this.createdUser = createdUser;
        this.updateDate = updateDate;
        this.updatedUser = updatedUser;
        this.productTxt = productTxt;
    }

    public Product() {
        super();
    }

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