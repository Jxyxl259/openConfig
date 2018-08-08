package com.yaic.platform.utils;

import com.github.pagehelper.Page;
import com.yaic.platform.common.ReturnMsgData;

/**
 * @ClassName: ReturnMsgUtils
 * @Description: 处理返回信息，主要对分页进行包装，来适应前端开源框架的分页标签tag
 * @author: mengxy
 * @date: 2018年7月24日 下午8:02:46
 */
public class ReturnMsgUtils {

	public static <T> ReturnMsgData getResults(Page<T> page) {
		ReturnMsgData result = new ReturnMsgData();
		result.setDataList(page.getResult());
		result.setPageSize(page.getPageSize());
		result.setRecordsTotal(page.getTotal());
		result.setPageNum(page.getPageNum());
		result.setPages(page.getPages());
		return result;
	}

	public static <T> ReturnMsgData getResults(Object lists) {
		ReturnMsgData result = new ReturnMsgData();
		result.setDataList(lists);
		return result;
	}

}
