package com.yaic.common;

public enum GlobalMessageEnum {

	SUCCESS(0,"操作成功"),
	FAILED(1,"操作失败"),
	PARAM_IS_NULL(2,"请求参数为空"),
	PARAM_ILLEGAL(3,"参数不合法");

	private Integer resultCode;

	private String resultMsg;

	GlobalMessageEnum(Integer resultCode, String resultMsg) {
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