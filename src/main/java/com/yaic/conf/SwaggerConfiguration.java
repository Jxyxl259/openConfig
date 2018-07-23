package com.yaic.conf;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @ClassName: Swagger整合
 * @Description:
 * @author: jiangxy
 * @date: 2018-07-18 14:14
 *
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

	@Bean
	public Docket createProductModuleRestApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.pathMapping("/")
				.select()
				//.apis(RequestHandlerSelectors.basePackage("com.yaic.platform.productModule.controller"))
				.paths(getPaths())
				.build();
	}

	/** 
	* @Description: 去除springBoot ErrorController,只显示项目相关控制器 
	* @Param:
	* @return:  
	* @Author: jiangxy
	* @Date: 2018\7\19 0019 
	*/ 
	private Predicate<String> getPaths() {
		return Predicates.or(
				PathSelectors.regex("/product/*"),
				PathSelectors.regex("/partner/*"),
				PathSelectors.regex("/userAccount/*")
		);
	}


	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("OpenConfig RESTful APIs")
				.description("公共开放平台后台api接口文档")
				.version("1.0.0")
				.build();
	}


}