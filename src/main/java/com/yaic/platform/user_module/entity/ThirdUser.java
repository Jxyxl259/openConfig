package com.yaic.platform.user_module.entity;

import com.yaic.platform.common.BaseDto;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.Size;
import java.util.Date;

public class ThirdUser extends BaseDto {

    /**
     * 用户id
     */
    private Integer accountId;

    /**
     * 用户名称
     */
    private String accountName;

    /**
     * 用户密码
     */
    private String accountPassword;

    /**
     * 手机号
     */
    private String mobile;

    /**
     * 邮箱地址
     */
    private String email;

    /**
     * 认证标识 1：已认证 0：未认证
     */
    @NotBlank(message="认证标识不能为空")
    @Size(min=1, max=1)
    @Range(min=0, max=1)
    private String authFlag;

    /**
     * 有效标识 1：有效 0：无效
     */
    @NotBlank(message="有效标识不能为空")
    @Size(min=1, max=1)
    @Range(min=0, max=1)
    private String validFlag;

    /**
     * 创建日期
     */
    private Date createdDate;

    /**
     * 创建人
     */
    private String createdUser;

    /**
     * 更新日期
     */
    private Date updatedDate;

    /**
     * 更新人
     */
    private String updatedUser;

    public ThirdUser(Integer accountId, String accountName, String accountPassword, String mobile, String email, String authFlag, String validFlag, Date createdDate, String createdUser, Date updatedDate, String updatedUser) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountPassword = accountPassword;
        this.mobile = mobile;
        this.email = email;
        this.authFlag = authFlag;
        this.validFlag = validFlag;
        this.createdDate = createdDate;
        this.createdUser = createdUser;
        this.updatedDate = updatedDate;
        this.updatedUser = updatedUser;
    }

    public ThirdUser() {
        super();
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName == null ? null : accountName.trim();
    }

    public String getAccountPassword() {
        return accountPassword;
    }

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword == null ? null : accountPassword.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getAuthFlag() {
        return authFlag;
    }

    public void setAuthFlag(String authFlag) {
        this.authFlag = authFlag == null ? null : authFlag.trim();
    }

    public String getValidFlag() {
        return validFlag;
    }

    public void setValidFlag(String validFlag) {
        this.validFlag = validFlag == null ? null : validFlag.trim();
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

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getUpdatedUser() {
        return updatedUser;
    }

    public void setUpdatedUser(String updatedUser) {
        this.updatedUser = updatedUser == null ? null : updatedUser.trim();
    }
}