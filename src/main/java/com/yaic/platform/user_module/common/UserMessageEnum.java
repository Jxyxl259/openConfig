package com.yaic.platform.user_module.common;

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