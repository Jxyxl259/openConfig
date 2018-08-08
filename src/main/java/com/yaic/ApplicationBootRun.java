package com.yaic;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
@MapperScan(basePackages={"com.yaic.**.dao"})		
public class ApplicationBootRun extends SpringBootServletInitializer{

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder applicationBuilder) {
		return applicationBuilder.sources(ApplicationBootRun.class);
	}
	
	/**
	 * @Description: 项目启动入口
	 */
	public static void main(String[] args) {
		SpringApplication.run(ApplicationBootRun.class, args);
	}
}
