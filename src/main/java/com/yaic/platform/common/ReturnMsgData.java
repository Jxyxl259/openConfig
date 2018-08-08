package com.yaic.platform.common;

/**
 * @ClassName: ReturnMsgData
 * @Description: 返回消息的数据部分
 * @author: mengxy
 * @date: 2018年7月25日 上午11:45:04
 */
public class ReturnMsgData{
	
	/** 总条数 */
	private Long recordsTotal;

	/** 总页数 */
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

	public Long getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(Long recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
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

	
}
