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
	
	SYS_CODE_500(500,"系统异常,请联系系统管理员"),
	SYS_CODE_200(200,"操作成功"),
	SYS_CODE_300(300,"请求参数不合法"),

	// 参数
	PARAM_IS_NULL(4001,"请求参数为空"),
	PARAM_ILLEGAL(4003,"参数不合法"),

	// 数据库交互
	DATABASE_INTERACTIVE_FAILED(5000,"数据操作失败"),
	
	//删除相关操作提示
	DELETE_OPERATION_6001(6001, "操作数据个数不一致，请联系管理员核对信息"),

	// 文件上传
	FILE_TYPE_UNKNOW(7000,"文件类型未知"),
	FILE_TYPE_UNACCEPT(7001,"不支持的图片类型"),
	FILE_UPLOAD_FAILURE(7002,"文件上传失败"),
	FILE_UPLOAD_NULL(7003,"文件不能为空"),
	FILE_UPLOAD_SIZE(7004,"文件上传不能超过指定大小");

	private Integer code;
	private String msg;
	
	private GlobalMessageEnum(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}
	
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

	
}