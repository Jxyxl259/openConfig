package com.yaic.platform.common;


/**
 * @Description : 方法调用辅助消息
 * @author : jiangxy
 * @CreateDate : 2018-07-16 19:26:58
 *
 */
public class BaseInfo<T> {

	private Boolean success;

	private ResultMessage result;

	private T t;

	private String message;

	public BaseInfo(Boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	public BaseInfo(Boolean success, ResultMessage result) {
		this.success = success;
		this.result = result;
	}

	public BaseInfo(Boolean success, ResultMessage result, T t) {
		this.success = success;
		this.result = result;
		this.t = t;
	}

	public BaseInfo(Boolean success, ResultMessage result, T t, String message) {
		this.success = success;
		this.result = result;
		this.t = t;
		this.message = message;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public ResultMessage getResult() {
		return result;
	}

	public void setResult(ResultMessage result) {
		this.result = result;
	}

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}