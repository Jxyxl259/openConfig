package com.yaic.otherTest;

import org.junit.Test;

import java.io.File;

public class FileTest {

	@Test
	public void testDIR(){


		File f  = new File("./aaa/bbb");

		if(!f.exists() /*&& f.isDirectory()*/){
			boolean success = f.mkdirs();
			System.out.println(success);
		}

		System.out.println("end");

	}

}