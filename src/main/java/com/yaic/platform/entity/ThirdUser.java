package com.yaic.platform.entity;

import java.util.Date;

public class ThirdUser{
    /** 用户id*/
    private Integer accountId;

    /** 用户名称*/
    private String accountName;

    /** 用户密码*/
    private String accountPassword;

    /** 手机号*/
    private String mobile;

    /** 邮箱地址*/
    private String email;

    /** 认证标识 1：已认证 0：未认证*/
    private String authFlag;

    /** 有效标识 1：有效 0：无效*/
    private String validFlag;

    /** 创建日期*/
    private Date createdDate;

    /** 创建人*/
    private String createdUser;

    /** 更新日期*/
    private Date updatedDate;

    /** 更新人*/
    private String updatedUser;

	public ThirdUser() {
		super();
	}

	public ThirdUser(Integer accountId, String accountName, String accountPassword, String mobile, String email,
			String authFlag, String validFlag, Date createdDate, String createdUser, Date updatedDate,
			String updatedUser) {
		super();
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
		this.accountName = accountName;
	}

	public String getAccountPassword() {
		return accountPassword;
	}

	public void setAccountPassword(String accountPassword) {
		this.accountPassword = accountPassword;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAuthFlag() {
		return authFlag;
	}

	public void setAuthFlag(String authFlag) {
		this.authFlag = authFlag;
	}

	public String getValidFlag() {
		return validFlag;
	}

	public void setValidFlag(String validFlag) {
		this.validFlag = validFlag;
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
		this.updatedUser = updatedUser;
	}
    
}