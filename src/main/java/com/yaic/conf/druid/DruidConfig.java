package com.yaic.conf.druid;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DruidConfig{
	@ConfigurationProperties(prefix="spring.datasource")
	@Bean
	public DataSource druid(){
		return new DruidDataSource();
	}

	@Bean
	public ServletRegistrationBean statViewServlet(){
		ServletRegistrationBean bean = new ServletRegistrationBean(new StatViewServlet(), "/druid/*");
		Map<String,String> initParams = new HashMap<>();
		initParams.put("loginUsername","admin");
		initParams.put("loginPassword","admin");
		initParams.put("allow",""); // 允许所有访问
		bean.setInitParameters(initParams);
		return bean;
	}

	@Bean
	public FilterRegistrationBean wecStatFilter(){
		FilterRegistrationBean bean = new FilterRegistrationBean();
		bean.setFilter(new WebStatFilter());
		Map<String,String> initParams = new HashMap<>();
		initParams.put("exclusions","*.js,*.css,*.html,/druid/*");
               bean.setInitParameters(initParams);
               bean.setUrlPatterns(Arrays.asList("/*")); // 拦截所有请求
               return bean;
    }

}