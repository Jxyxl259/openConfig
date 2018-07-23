package com.yaic.platform.common;

/**
 * @description : 用户模块返回消息枚举
 * @author : jiangxy
 * @create-date : 2018\7\16
 * @create-time : 19:42
 */
public enum UserMessageEnum {

	NO_SUCH_THIRD_PARTY_ACCOUNT(20,"没有该第三方账户信息");

	private Integer resultCode;

	private String resultMsg;

	UserMessageEnum(Integer resultCode, String resultMsg) {
		this.resultCode = resultCode;
		this.resultMsg = resultMsg;
	}

	public Integer getResultCode() {
		return resultCode;
	}

	public void setResultCode(Integer resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}
}