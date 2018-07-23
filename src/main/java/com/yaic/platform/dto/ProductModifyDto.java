package com.yaic.platform.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

/**
 * @description : 产品修改DTO
 * @author : jiangxy
 * @create-date : 2018\7\16
 * @create-time : 19:40
 */
@ApiModel(value="productModifyDto",description="产品修改信息")
public class ProductModifyDto implements Serializable {
    /**
     * 产品ID
     */
    @NotNull
    @ApiModelProperty(value = "产品id", name = "productId",required = true)
    private Integer productId;

    /**
     * 产品名称
     */
    @ApiModelProperty(value = "产品名称", name = "productName" ,required = true)
    @NotBlank(message="产品名称不能为空")
    private String productName;

    /**
     * 产品图片路径
     */
    @ApiModelProperty(value = "本次修改之前产品图片路径（当涉及更换产品图片的时候此参数必填）", name = "ProductImage" ,required = false)
    private String productImage;

    /**
     * 有效标识 1：已认证 0：未认证
     */
    @NotBlank(message="产品有效标识不能为空")
    @Size(min=1, max=1)
    @Range(min=0, max=1)
    @ApiModelProperty(value = "有效标识", name = "productInvalid" ,required = true)
    private String productInvalid;

    /**
     * 产品备注
     */
    @ApiModelProperty(value = "产品备注", name = "productRemark" ,required = false)
    private String productRemark;

    /**
     * 产品详情页 div Html代码
     */
    @NotBlank(message="详情页 div Html代码不能为空")
    @ApiModelProperty(value = "产品展示 HTML代码", name = "productDivHtml" ,required = true)
    private String productDivHtml;

    /**
     * 备用字段Aa
     */
    @ApiModelProperty(hidden = true)
    private String productFiledAa;

    /**
     * 更新时间
     */
    @ApiModelProperty(hidden = true)
    private Date updateDate;

    /**
     * 更新人
     */
    @NotBlank(message="更新人不能为空")
    @ApiModelProperty(value = "更新人", name = "updatedUser" ,required = true)
    private String updatedUser;

    /**
     * 产品介绍
     */
    @ApiModelProperty(value = "产品介绍", name = "productTxt" ,required = false)
    private String productTxt;


	public ProductModifyDto() {}

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

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public String getProductTxt() {
        return productTxt;
    }

    public void setProductTxt(String productTxt) {
        this.productTxt = productTxt == null ? null : productTxt.trim();
    }
}