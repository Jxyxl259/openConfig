package com.yaic.platform.common;

import com.yaic.common.GlobalMessageEnum;

import java.io.Serializable;


/**
 * 
* @ClassName: ResultMessage 
* @Description: 统一controller的返回信息
* @author zhaoZD
* @date 2018年6月17日 下午9:34:58 
*
 */
public class ResultMessage<T> implements Serializable {
	private static final long serialVersionUID = -6095631145766356539L;
	
	/** 总条数 */
	private Long recordsTotal;

	/**
	 * 总页数
	 */
	private int pages;
	
	/** 每页显示条目数 */
	private Integer pageSize;
	
	
	/** 当前页数 */
	private Integer pageNum;
	
	
	/** 状态 0000:成功 	else：失败 */
	private String resultCode;
	

	/** 对应状态的消息 */
	private String resultMsg;
	
	
	/** 具体业务数据 */
	private Object dataList;

	/** 附加信息 */
	private T t;
	

	public ResultMessage() {}
	
	public ResultMessage(Object dataList) {
		this.dataList = dataList;
	}


	public ResultMessage(GlobalMessageEnum messageEnum){
		this.setResultCode(messageEnum.getResultCode()+"");
		this.setResultMsg(messageEnum.getResultMsg());
	}


	/**
	 * 
	* @Title:  
	* @Description: list返回数据构造函数
	* @param recordsTotal
	* @param pageSize
	* @param pageNum
	* @param dataList
	 */
	public ResultMessage(Long recordsTotal, Integer pageSize, Integer pageNum, Object dataList) {
		this.recordsTotal = recordsTotal;
		this.pageSize = pageSize;
		this.pageNum = pageNum;
		this.dataList = dataList;
	}
	
	/**
	 * 
	* @Title:  
	* @Description: add,edit,delete返回数据构造函数
	* @param resultCode
	* @param resultMsg
	 */
	public ResultMessage(String resultCode, String resultMsg) {
		this.resultCode = resultCode;
		this.resultMsg = resultMsg;
	}

	public Long getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(Long recordsTotal) {
		this.recordsTotal = recordsTotal;
	}


	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}

	public Object getDataList() {
		return dataList;
	}

	public void setDataList(Object dataList) {
		this.dataList = dataList;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}


	public ResultMessage resetResultMessage(GlobalMessageEnum messageEnum){
		this.setResultCode(messageEnum.getResultCode()+"");
		this.setResultMsg(messageEnum.getResultMsg());
		return this;
	}


	

//	/** 此构造方法应用于data为null的场景 */
//	public ResponseMessage(String message) {
//		this.state = SUCCESS;// 1
//		this.message = message;
//	}



}
