package com.yaic;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;


public class DruidTest extends MainApplicationTest {

	@Test
	public void testDruidDataSource(){

		System.out.println(super.dataSource);

	}


}