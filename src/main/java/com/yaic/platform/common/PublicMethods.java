package com.yaic.platform.common;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class PublicMethods {
	
	private static final Logger logger = LoggerFactory.getLogger(PublicMethods.class);

	/**
	* @Title: SplitIdsToArray 
	* @Description: 将字符串以特定格式拆分成字符串集合
	* @param ids
	* @return    
	* @return List<String>  
	* @throws
	 */
	public static List<String> SplitIdsToArray(String ids) {
		
		List<String> lists = new ArrayList<String>();
		
		if(StringUtils.isNotEmpty(ids)){
			
			ids = checkIdsStr(ids);
			
			String[] idArray = ids.split(",");
			
			for (String str : idArray) {
				
				lists.add(str);
			}
		}
		
		return lists;
	}


	/**
	* @Title: checkIdsStr 
	* @Description: 修改间隔符并判断去掉最后一位间隔符
	* @param ids
	* @return    
	* @return String  
	* @throws
	 */
	public static String checkIdsStr(String ids) {
		
		//字符串去前后空格
		ids = ids.trim();
		
		if(ids != null && ids.length() > 0){
			
			logger.debug("check ids:{}  last char and the Spacer code",ids);
			
			//对间隔符进行转换为 ','
			if(ids.indexOf("-")>0)  ids = ids.replace("-",",");
			if(ids.indexOf("/")>0)  ids = ids.replace("/",",");
			if(ids.indexOf("~")>0)  ids = ids.replace("~",",");
			
			//获取最后一位,判断是否为间隔符
			String lastChar = ids.substring(ids.length()-1);
			
			//若最后一位为间隔符,则将其去掉;如果不是则忽略
			if(lastChar.equals(",")){
				ids = ids.substring(0,ids.length()-1);
			}
		}
		return ids;
	}

}
