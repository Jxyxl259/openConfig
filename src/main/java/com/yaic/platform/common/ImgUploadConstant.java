package com.yaic.platform.common;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.File;

import static com.yaic.common.CommonConstant.*;
import static com.yaic.platform.common.UuidUtils.getRandomFileName;

/**
 * @Description : 上传图片功能相关常量，<br/>
 *                该类中的属性通过@ConfigurationProperties注解与.yml配置文件中前缀为fileUploadConfig的属性值绑定
 * @author : jiangxy
 * @date : 2018-07-13
 *
 */
@Component("fileUploadPath")
@ConfigurationProperties(prefix = "fileUploadConfig")
public class ImgUploadConstant {

	private static Logger log = LoggerFactory.getLogger(ImgUploadConstant.class);

	private String OS;

	private String WINDOWS_FILE_UPLOAD_PATH;

	private String LINUX_FILE_UPLOAD_PATH;

	private String PRODUCT_IMAGE_FILE;

	private String PARTNER_IMAGE_FILE;

	public ImgUploadConstant(){
		this.OS = System.getProperties().getProperty(OS_NAME);
	}

	public String getWindowsFileUploadPath() {
		return WINDOWS_FILE_UPLOAD_PATH;
	}

	public void setWindowsFileUploadPath(String windowsFileUploadPath) {
		this.WINDOWS_FILE_UPLOAD_PATH = windowsFileUploadPath;
	}

	public String getOS(){
		if(this.OS == null){
			throw new RuntimeException("can't get OS info !!!");
		}else{
			return this.OS;
		}
	}

	public String getLinuxFileUploadPath() {
		return LINUX_FILE_UPLOAD_PATH;
	}

	public void setLinuxFileUploadPath(String linuxFileUploadPath) {
		this.LINUX_FILE_UPLOAD_PATH = linuxFileUploadPath;
	}

	public String getProductImageFile() {
		return PRODUCT_IMAGE_FILE;
	}

	public void setProductImageFile(String productImageFile) {
		this.PRODUCT_IMAGE_FILE = productImageFile;
	}

	public String getPartnerImageFile() {
		return PARTNER_IMAGE_FILE;
	}

	public void setPartnerImageFile(String partnerImageFile) {
		this.PARTNER_IMAGE_FILE = partnerImageFile;
	}

	/**
	 * 获取上传文件的绝对路径
	 * @param originalUpLoadFileName 源文件名
	 * @param prefix 前缀，如产品名称 或者 合作伙伴名称
	 * @param module 模块名称，目前仅 partner 和 product 两个模块涉及到图片上传
	 * @return 文件在服务器文件系统上的绝对路径
	 */
	public String getUploadFileAbsolutePath(String originalUpLoadFileName, String prefix, String module){

		StringBuilder distPath = new StringBuilder();
		if(OS.toLowerCase().contains(WIN)){
			switch(module){
				case PARTNER_MODULE :
					distPath.append(WINDOWS_FILE_UPLOAD_PATH).append(PARTNER_IMAGE_FILE);
					break;
				case PRODUCT_MODULE :
					distPath.append(WINDOWS_FILE_UPLOAD_PATH).append(PRODUCT_IMAGE_FILE);
					break;
				default : throw new RuntimeException("Unknow Module !!!");
			}
		}else{
			switch(module){
				case PARTNER_MODULE :
					distPath.append(LINUX_FILE_UPLOAD_PATH).append(PARTNER_IMAGE_FILE);
					break;
				case PRODUCT_MODULE :
					distPath.append(LINUX_FILE_UPLOAD_PATH).append(PRODUCT_IMAGE_FILE);
					break;
				default : throw new RuntimeException("Unknow Module !!!");
			}
		}

		log.debug("File Upload Destination Path={}", distPath);

		// 如果路径未被创建则创建该路径
		File distDir = new File(distPath.toString());
		if(!distDir.exists()){
			boolean done = distDir.mkdirs();
			log.info("Init upload directory success!! ");
		}

		StringBuilder fileName = new StringBuilder(prefix);

		// 源文件名仅为了截取文件后缀(ex:jpg)
		String fileSuffixType = originalUpLoadFileName.substring(originalUpLoadFileName.lastIndexOf(".") + 1, originalUpLoadFileName.length());
		fileName.append("-").append(getRandomFileName(fileSuffixType));

		log.debug("uploadFileName={}", fileName.toString());

		String uploadFileAbsolutePath = distPath.append(File.separator).append(fileName).toString();

		log.debug("upload file absolute path={}", uploadFileAbsolutePath);

		return uploadFileAbsolutePath;
	}
}