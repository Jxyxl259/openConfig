package com.yaic.common;

/**
 * @Description : 通用常量
 */
public interface CommonConstant {

	/** 登录模块使用的常亮 */
	interface loginUser{
		public static final String LOGIN_USER_NAME = "LOGIN_USER_NAME";
		public static final String LOGIN_USER_ID = "LOGIN_USER_ID";
		public static final String LOGIN_USER_INFO = "LOGIN_USER_INFO";
		
		public static final String ALGORITHM_NAME= "SHA1";
		public static final int HASH_ITERATIONS= 2;
		public static final String SALT = "sns";
	}

	/** 左侧菜单权限控制模块使用的常量 */
	public static final String GRANTED_RESOURCES = "granted_resources";
	public static final String BIND_MENU_RESOURCES = "bind_menu_resources";
	public static final String BIND_MENU_RESOURCES_ROLE = "login_user";


}