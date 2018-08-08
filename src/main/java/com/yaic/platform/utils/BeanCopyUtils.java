package com.yaic.platform.utils;

import com.yaic.base.cglib.beans.BeanCopier;

public class BeanCopyUtils {
	
	/**
	 * @Title: beanCopy
	 * @Description: 对于大量频繁使用的BeanCopier，create效率是需要考虑在内的，建议声明static静态域，再去调用copy此方法。    对于频繁的调用，建议自己去实现
	 * @param fromObj
	 * @param toObj
	 * @return: void
	 */
	public static void beanCopy(Object fromObj, Object toObj) {
		try {
			BeanCopier copier = BeanCopier.create(fromObj.getClass(), toObj.getClass(), false); // 同名同属性不用开启转换   http://www.iteye.com/topic/799827
			copier.copy(fromObj, toObj, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
