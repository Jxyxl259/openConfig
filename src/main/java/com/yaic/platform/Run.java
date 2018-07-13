package com.yaic.platform;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;


@ServletComponentScan
@SpringBootApplication		//启动标志
@MapperScan(basePackages={
		"com.yaic.platform.user_module.dao",
		"com.yaic.platform.partner_module.dao",
		"com.yaic.platform.product_module.dao"})		//mybatis reload xml
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
