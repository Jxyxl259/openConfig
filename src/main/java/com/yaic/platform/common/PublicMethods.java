package com.yaic.platform.common;

import com.yaic.common.GlobalMessageEnum;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static com.yaic.common.GlobalMessageEnum.FILE_TYPE_UNACCEPT;
import static com.yaic.common.GlobalMessageEnum.FILE_TYPE_UNKNOW;
import static com.yaic.platform.common.BaseController.getResults;

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


	/**
	 * 校验上传文件基本信息
	 * @param imageFile 上传源文件
	 * @return 如果校验不通过，baseInfo中直接包含返回给前端的结果
	 */
	public static BaseInfo checkUpLoadImg(MultipartFile imageFile){

		BaseInfo info = new BaseInfo(true, "");

		if(imageFile == null){
			// 上传文件为空
			ResultMessage result = new ResultMessage(GlobalMessageEnum.PARAM_IS_NULL.getResultCode()+"","No Picture!!!");
			info.setResult(result);
			info.setSuccess(false);
			return info;
		}

		String fileContentType = imageFile.getContentType();

		if(fileContentType == null){
			// 文件媒体类型为空
			ResultMessage result = new ResultMessage(FILE_TYPE_UNKNOW);
			info.setResult(result);
			info.setSuccess(false);

		}else{
			if(!(fileContentType.contains("image/jpeg") ||fileContentType.contains("image/png"))){
				// 返回错误提示"仅支持.jpg .png格式的图片文件"
				ResultMessage result = new ResultMessage(FILE_TYPE_UNKNOW);
				info.setResult(result);
				info.setSuccess(false);

			}
		}
		return info;
	}



}
