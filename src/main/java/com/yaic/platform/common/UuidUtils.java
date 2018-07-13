package com.yaic.platform.common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class UuidUtils {
	
	public static String getUuid() {
	    return UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
	}

	/**
	 * 随机获取文件名
	 * @return
	 */
	public static String getRandomFileName(String fileType){

		StringBuilder sb = new StringBuilder();
		String uuidPrefix = getUuid().substring(0, 10);
		String datePrefix = SimpleDateFormat.getDateInstance().format(new Date()).replaceAll("-", "");
		return sb.append(uuidPrefix).append("-").append(datePrefix).append(".").append(fileType).toString();
	}



	public static void main(String[] args) {

//		System.out.println(getUuid().substring(0,10));
		System.out.println(getRandomFileName("jpg"));

//		DateFormat dateInstance = SimpleDateFormat.getDateInstance();
//
//		String format = dateInstance.format(new Date()).replaceAll("-", "");
//
//		System.out.println(format);



	}
}
