package com.yaic.otherTest;

import java.util.Properties;
import java.util.Set;

public class SysPropertiesTest {

	public static void main(String[] args) {

		Properties properties = System.getProperties();
		Set<String> strings = properties.stringPropertyNames();
		for(String propName : strings){
			System.out.println(propName + "---->" + properties.getProperty(propName));
		}

	}
}