package com.yaic.conf.SpringMVC;

import org.apache.commons.fileupload.FileUpload;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MySpringMvcConfiguration extends WebMvcConfigurerAdapter {


	@Bean
	@ConditionalOnClass(FileUpload.class)
	public CommonsMultipartResolver commonsMultipartResolver(){
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setDefaultEncoding("UTF-8");
		// 限制单个文件的大小为200KB
		multipartResolver.setMaxUploadSizePerFile(204800);

		return multipartResolver;
	}

}