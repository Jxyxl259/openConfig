package com.yaic.common;

/**
 *
 * @Description : 全局消息枚举
 * @author : jiangxy
 * @CreateDate : 2018-07-16 19:24:50
 *
 */
public enum GlobalMessageEnum {

	SUCCESS(0,"操作成功"),
	FAILED(1,"操作失败"),
	PARAM_IS_NULL(2,"请求参数为空"),
	PARAM_ILLEGAL(3,"参数不合法"),



	// 数据库交互
	DATABASE_INTERACTIVE_FAILED(5000,"数据操作失败"),



	// 文件上传
	FILE_TYPE_UNKNOW(7000,"文件类型未知"),
	FILE_TYPE_UNACCEPT(7001,"不支持的图片类型"),
	FILE_UPLOAD_FAILURE(7002,"文件上传失败");




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