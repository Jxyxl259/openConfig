package com.yaic.utils;

import org.apache.commons.lang.StringUtils;

public class IdGenerateUtils {

	public static String generateId(String parentId, String subId) {
		if (StringUtils.isBlank(subId)) { //父节点后面添加  “01”
			return StringUtils.rightPad(parentId, parentId.length()+2, "01");
		}else { // subId="1 00 01"   直接+1
			return Integer.toString(Integer.parseInt(subId)+1);
		}
	}
	
	public static void main(String[] args) {
		System.out.println(generateId("1","10101"));
		System.out.println(generateId("1",null));
		System.out.println(generateId("10101",null));
		
		System.out.println(StringUtils.leftPad("100", 10, "0"));
		
		System.out.println(Integer.parseInt("00100"));
	}
}
