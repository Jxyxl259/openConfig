package com.yaic;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.yaic.base.cglib.beans.BeanCopier;

public class BeanCopyTest {

	@Test
	public void test() {
		Person p1 = new Person("zhangsan", 10);
		Map<String, Person> map = new HashMap<String, Person>();
		map.put("test", p1);
		p1.setName("lisi");
		p1.setAge(11);
		Person p2 = new Person();
		getcopy(p1, p2);
		System.out.println(p2);
		p2.setName("p2's name");
		p2.setAge(200);
		System.out.println(p2);
		System.out.println(map.get("test"));

	}
	
	void getcopy(Object p1, Object p2){
		BeanCopier copier = null;
		try {
			System.out.println(p2.getClass());
			copier = BeanCopier.create(p1.getClass(), p2.getClass(), false); // 同名同属性不用开启转换   http://www.iteye.com/topic/799827
			copier.copy(p1, p2, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
