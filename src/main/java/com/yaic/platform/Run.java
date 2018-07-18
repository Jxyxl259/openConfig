package com.yaic.platform;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@ServletComponentScan
@SpringBootApplication		//启动标志
@MapperScan(basePackages={
		"com.yaic.platform.userModule.dao",
		"com.yaic.platform.partnerModule.dao",
		"com.yaic.platform.productModule.dao"})		//mybatis reload xml
public class Run{

	/**
	 *
	 * @Title: main
	 * @Description: 项目启动入口
	 * @param args
	 * @return void
	 * @throws
	 */
	public static void main(String[] args) {
		SpringApplication.run(Run.class, args);
	}
}
