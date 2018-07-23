package com.yaic.conf;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.Arrays;

/**
 * @ClassName: web配置
 * @Description: 
 * @author: jiangxy
 * @date: 2018-07-18 20:39
 * 
 */
@Configuration
public class WebConfiguration {



	// 字符编码过滤器
	@Bean
	public FilterRegistrationBean myFilter(){
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();

		CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
		encodingFilter.setEncoding("UTF-8");
		encodingFilter.setForceEncoding(true);
		encodingFilter.setForceRequestEncoding(true);
		encodingFilter.setForceResponseEncoding(true);

		filterRegistrationBean.setFilter(encodingFilter);
		filterRegistrationBean.setUrlPatterns(Arrays.asList("/*"));
		return filterRegistrationBean;
	}

}