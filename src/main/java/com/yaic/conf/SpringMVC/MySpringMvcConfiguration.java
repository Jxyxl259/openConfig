package com.yaic.conf.springmvc;

import org.apache.commons.fileupload.FileUpload;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


/**
 * 
 * @Description : springMVC扩展配置
 * @author : jiangxy
 * @CreateDate : 2018-07-16 19:25:49
 *
 */
@Configuration
public class MySpringMvcConfiguration extends WebMvcConfigurerAdapter {


//	@Override
//	public void addViewControllers(ViewControllerRegistry registry) {
//		registry.addViewController("/").setViewName("index");
//		registry.addViewController("/index").setViewName("index");
//		registry.addViewController("/").setViewName("index");
//	}


	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		super.addResourceHandlers(registry);

		// 配置Swagger-ui.html访问
		registry.addResourceHandler("swagger-ui.html")
				.addResourceLocations("classpath:/META-INF/resources/");

	}

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