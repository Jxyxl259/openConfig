package com.yaic.platform.controller;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

/**
 * @Description: 测试Controller
 * @author: jiangxy
 * @date: 2018\7\27 0027 18:23
 */
@RestController
public class TestController {

	private Logger log = LoggerFactory.getLogger(TestController.class);

	@RequestMapping("/testCallBack")
	public void test(HttpServletRequest request, HttpServletResponse response){
		List<String> lines = null;
		ServletInputStream inputStream = null;
		try {
			inputStream = request.getInputStream();
			lines = IOUtils.readLines(inputStream, "UTF-8");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(inputStream != null){
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		StringWriter sw = new StringWriter();
		for(String line : lines){
			sw.write(line);
		}

		log.info("testCallBack 接收到信息：{}", sw.toString());
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.write("SUCCESS");
			writer.flush();
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}


}