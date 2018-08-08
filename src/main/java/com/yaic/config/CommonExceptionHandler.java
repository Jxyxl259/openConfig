package com.yaic.config;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.http.fileupload.FileUploadBase.FileSizeLimitExceededException;
import org.apache.tomcat.util.http.fileupload.FileUploadBase.SizeLimitExceededException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;

import com.yaic.common.GlobalMessageEnum;
import com.yaic.platform.common.ReturnMsg;

/**
 * @ClassName: FileExceptionHandler
 * @Description: 对于图片上传，大于了设置的默认值，就会被捕获特定的异常。提供用户合理的信息提示
 * @author: mengxy
 * @date: 2018年7月25日 下午2:07:32
 */
@RestControllerAdvice
public class CommonExceptionHandler {

	/**
	 * @Title: handleMultipartException
	 * @Description: 上传图片的大小异常处理
	 * @param request
	 * @param ex
	 * @return
	 * @return: ReturnMsg
	 */
    @ExceptionHandler({MultipartException.class})
    public ReturnMsg handleMultipartException(HttpServletRequest request, Throwable ex){
		MultipartException mEx = (MultipartException)ex;
		Throwable cause = ex.getCause().getCause();
		ReturnMsg result = new ReturnMsg(false);
		float permittedSize = 0;
		result.setCode(GlobalMessageEnum.FILE_UPLOAD_SIZE.getCode());
        if (cause instanceof SizeLimitExceededException){
            SizeLimitExceededException flEx = (SizeLimitExceededException) cause;
            permittedSize = flEx.getPermittedSize() / 1024 ;
            result.setMessage(GlobalMessageEnum.FILE_UPLOAD_SIZE.getMsg()+" ("+permittedSize+"KB) ");
        } else if (cause instanceof FileSizeLimitExceededException){
            FileSizeLimitExceededException flEx = (FileSizeLimitExceededException)mEx.getCause().getCause();
            permittedSize = flEx.getPermittedSize() / 1024 ;
            result.setMessage(GlobalMessageEnum.FILE_UPLOAD_SIZE.getMsg()+" ("+permittedSize+"KB) ");
        }else {
        	result.setCode(GlobalMessageEnum.SYS_CODE_500.getCode());
        	result.setMessage(GlobalMessageEnum.SYS_CODE_500.getMsg());
        }     
        return result;
     }
    
    /**
     * @Title: handleBindExceptionException
     * @Description: 对于 注解@valid 进行dto属性注解的校验，要是有异常，提醒用户那些字段是必须要填写的
     * @param bindingResult
     * @param ex
     * @return
     * @return: ReturnMsg
     */
    @ExceptionHandler({BindException.class})
    public ReturnMsg handleBindExceptionException(BindingResult bindingResult, Throwable ex){
    	ReturnMsg returnMsg = new ReturnMsg(false);
    	returnMsg.setCode(GlobalMessageEnum.SYS_CODE_300.getCode());
    	StringBuilder bf = new StringBuilder();
    	if(bindingResult.hasErrors()){
            List<ObjectError> ls=bindingResult.getAllErrors();
            for (int i = 0; i < ls.size(); i++) {
            	bf.append(","+ls.get(i).getDefaultMessage());
            }
        }
    	String mString = bf.toString();
    	returnMsg.setMessage(mString.substring(1));
    	
        return returnMsg;
     } 
}
