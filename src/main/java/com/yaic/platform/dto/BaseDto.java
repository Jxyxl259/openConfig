package com.yaic.platform.dto;

/**
 *
 * @Description : 数据模型类基类
 * @author : jiangxy
 * @CreateDate : 2018-07-16 19:26:25
 *
 */
public class BaseDto {

	private Integer pageSize = 10;
	
	private Integer pageNum = 0;
	
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
	
}
