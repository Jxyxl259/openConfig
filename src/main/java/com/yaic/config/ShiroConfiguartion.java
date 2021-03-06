package com.yaic.config;

import com.yaic.common.CommonConstant;
import com.yaic.system.dao.UserDao;
import com.yaic.system.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.Session;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.ServletContainerSessionManager;
import org.apache.shiro.web.util.SavedRequest;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import javax.servlet.Filter;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicInteger;

import static com.yaic.common.CommonConstant.PASSWORD_RETRY_CACHE;
import static com.yaic.common.CommonConstant.BIND_MENU_RESOURCES;
import static com.yaic.common.CommonConstant.BIND_MENU_RESOURCES_ROLE;
import static com.yaic.common.CommonConstant.USER_INVALID;



/**
 * 权限配置类
 * 
 * @ClassName: ShiroConfig
 * @Description: TODO
 * @author zhaoZD
 * @date 2018年6月17日 下午9:27:03
 *
 */
@Order(3)
@Configuration
public class ShiroConfiguartion {

	@Autowired
	private UserDao userDao;

	/** 
	* @Title: shirFilter 
	* @Description: 权限拦截器
	* @param securityManager
	* @return    
	* @return ShiroFilterFactoryBean  
	* @throws 
	*/
	@Bean
	public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
		shiroFilterFactoryBean.setSecurityManager(securityManager);
		
		// 登出拦截器.
		Map<String, Filter> filters = new HashMap<>();
		LogoutFilter logoutFilter = new LogoutFilter();
		// 自定义表单登录验证拦截器（可在此扩展登录验证码功能）
		FormAuthenticationLoginFilter authcFilter = new FormAuthenticationLoginFilter();
		// 自定义左侧菜单资源过滤器
		BindGrantedMenuResourcesFilter menuFilter = new BindGrantedMenuResourcesFilter();
		logoutFilter.setRedirectUrl("/gotoLoginPage");
		filters.put("logout", logoutFilter);
		filters.put("authc", authcFilter);
		filters.put("menu", menuFilter);

		shiroFilterFactoryBean.setFilters(filters);

		// 该Url仅仅是跳转到登录页面（并非执行登录的请求），如果不设置默认会自动寻找Web工程根目录下的"/login.jsp"页面
		shiroFilterFactoryBean.setLoginUrl("/gotoLoginPage");
		// 登录成功后要跳转的链接
		shiroFilterFactoryBean.setSuccessUrl("/home");
		// 未授权界面;
		shiroFilterFactoryBean.setUnauthorizedUrl("/403");
		
		// 配置规则
		loadShiroFilterChain(shiroFilterFactoryBean);
		
		return shiroFilterFactoryBean;
	}
	
	/** 
	* @Title: loadShiroFilterChain 
	* @Description: 配置拦截规则
	* @param shiroFilterFactoryBean    
	* @return void  
	* @throws 
	*/
	private void loadShiroFilterChain(ShiroFilterFactoryBean shiroFilterFactoryBean) {
		Map<String, String> filterChainDefinitionMap = new LinkedHashMap<>();

		// 登出
		filterChainDefinitionMap.put("/logout", "logout");

		// authc：该过滤器下的页面必须登录后才能访问
		filterChainDefinitionMap.put("/user/**", "authc");
		filterChainDefinitionMap.put("/home", "authc");

		// 左侧菜单权限获取
		filterChainDefinitionMap.put("/resource/menu", "menu");

		// 此Url为真正执行登录验证的链接
		filterChainDefinitionMap.put("/doLogin", "authc");
		filterChainDefinitionMap.put("/index*", "authc");
		filterChainDefinitionMap.put("/account/**", "authc");
		filterChainDefinitionMap.put("/", "authc");
		 
		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
	}


	@Bean
	@Autowired
	public CacheManager springCacheManagerWrapper(org.springframework.cache.ehcache.EhCacheCacheManager springCacheCacheManager){
		SpringCacheManagerWrapper springCacheWrapper = new SpringCacheManagerWrapper();
		springCacheWrapper.setCacheManager(springCacheCacheManager);
		return springCacheWrapper;
	}

	/** 
	* @Title: hashedCredentialsMatcher 
	* @Description: 凭证匹配器
	* @return    
	* @return HashedCredentialsMatcher  
	* @throws 
	*/
	@Bean
	@Autowired
	public HashedCredentialsMatcher hashedCredentialsMatcher(org.apache.shiro.cache.CacheManager CacheManager) {
		RetryLimitHashedCredentialsMatcher credentialsMatcher = new RetryLimitHashedCredentialsMatcher(CacheManager);
		credentialsMatcher.setHashAlgorithmName(CommonConstant.loginUser.ALGORITHM_NAME);// 散列算法:这里使用MD5算法;
		credentialsMatcher.setHashIterations(CommonConstant.loginUser.HASH_ITERATIONS);// 散列的次数，比如散列两次，相当于 md5(md5(""));
		credentialsMatcher.setStoredCredentialsHexEncoded(true);
		return credentialsMatcher;
	}

	@Bean
	@Autowired
	public ShiroRealm myShiroRealm(CredentialsMatcher credentialsMatcher) {
		ShiroRealm myShiroRealm = new ShiroRealm();
		myShiroRealm.setCredentialsMatcher(credentialsMatcher);
		myShiroRealm.setCachingEnabled(true);
		myShiroRealm.setAuthenticationCachingEnabled(true);
		myShiroRealm.setAuthorizationCachingEnabled(true);
		myShiroRealm.setAuthenticationCacheName("authenticationCache");
		myShiroRealm.setAuthorizationCacheName("authorizationCache");
		return myShiroRealm;
	}

	@Bean
	@Autowired
	public SecurityManager securityManager(Realm myShiroRealm, org.apache.shiro.cache.CacheManager springCacheManagerWrapper) {
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		securityManager.setRealm(myShiroRealm);
		securityManager.setCacheManager(springCacheManagerWrapper);
		securityManager.setSessionManager(new ServletContainerSessionManager());
		return securityManager;
	}

	/**
	 * @Title: authorizationAttributeSourceAdvisor @Description: 开启shiro aop注解支持.
	 *         使用代理方式;所以需要开启代码支持; @param securityManager @return @return
	 *         AuthorizationAttributeSourceAdvisor @throws
	 */
	@Bean
	public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
		AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
		authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
		return authorizationAttributeSourceAdvisor;
	}

	@Bean(name = "simpleMappingExceptionResolver")
	public SimpleMappingExceptionResolver createSimpleMappingExceptionResolver() {
		SimpleMappingExceptionResolver r = new SimpleMappingExceptionResolver();
		Properties mappings = new Properties();
		mappings.setProperty("DatabaseException", "databaseError");// 数据库异常处理
		mappings.setProperty("UnauthorizedException", "403");
		r.setExceptionMappings(mappings); // None by default
		r.setDefaultErrorView("error"); // No default
		r.setExceptionAttribute("ex"); // Default is "exception"
		// r.setWarnLogCategory("example.MvcLogger"); // No default
		return r;
	}


	/**
	 * @ClassName FormAuthenticationLoginFilter
	 * @Description 对表单提交的登录用户的用户名及密码
	 * @Author jiangxy
	 * @Date 2018-8-21 20:10
	 * @Version 1.0.0
	 */
	class FormAuthenticationLoginFilter extends FormAuthenticationFilter{


		/**
		 * 父类FormAuthenticationFilter中的 onAccessDenied 方法会先判断请求的url是否是一个登录请求，
		 * 如果是登录请求的话，再通过请求的类型（POST GET）判断执行登录还是跳转到登录页面
		 * 		POST请求 执行登录
		 * 		GET请求	放行请求显示登录页面
		 * 如果跳转页面与执行登录的请求映射不是同一个，都需要配置在此
		 * @param request
		 * @param response
		 * @return
		 */
		@Override
		protected boolean isLoginRequest(ServletRequest request, ServletResponse response) {
			//return super.isLoginRequest(request, response);
			String requestUrl = WebUtils.getPathWithinApplication(WebUtils.toHttp(request));
			return requestUrl.equals("/doLogin") || requestUrl.equals(getLoginUrl());

		}

		@Override
		protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
			this.issueSuccessRedirect(request, response);
			return false;
		}

        /**
         * 处理登录用户重新登录问题
         * @param request
         * @param response
         * @param mappedValue
         * @return
         */
		@Override
		protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
			if(super.isAccessAllowed(request, response, mappedValue)){
				request.setAttribute("accessFlag",true);
				return true;
			} else {
				return false;
			}
		}

		/**
		 * 如果用户在未登录的情况下访问某需要认证的页面，
		 * shiro会在执行ProxyFilterChain的过程中过滤（拦截）该次请求，
		 * 并保存本次请求，
		 * 然后将页面重定向到登录页面，
		 * 待用户登录成功之后会检查是否有之前拦截下来的请求，
		 * 如果有则重定向到该请求的访问路径
		 * 如果没有则重定向到successfulUrl（配置在shiroFilterFactoryBean中的属性）
		 * @param request
		 * @param response
		 * @throws Exception
		 */
		@Override
		protected void issueSuccessRedirect(ServletRequest request, ServletResponse response) throws Exception {
			String successUrl = null;
			boolean contextRelative = true;
			SavedRequest savedRequest = WebUtils.getAndClearSavedRequest(request);
			if (savedRequest != null && savedRequest.getMethod().equalsIgnoreCase(AccessControlFilter.GET_METHOD)) {
				if(!savedRequest.getRequestUrl().equals("/"+ request.getServletContext().getContextPath())){
					successUrl = savedRequest.getRequestUrl();
				}
				contextRelative = false;
			}

			if (successUrl == null) {
				successUrl = getSuccessUrl();
			}

			if (successUrl == null) {
				throw new IllegalStateException("Success URL not available via saved request or via the " +
						"successUrlFallback method parameter. One of these must be non-null for " +
						"issueSuccessRedirect() to work.");
			}

			WebUtils.issueRedirect(request, response, successUrl, null, contextRelative);
		}

	}


	/**
	 * @ClassName BindGrantedMenuResourcesFilter
	 * @Description 授权给用户左侧菜单资源
	 * @Author jiangxy
	 * @Date 2018-8-24 17:39
	 * @Version 1.0.0
	 */
	class BindGrantedMenuResourcesFilter extends AuthorizationFilter {

		@Override
		protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
			Subject subject = getSubject(request, response);
			Session session = subject.getSession();
			session.setAttribute(BIND_MENU_RESOURCES,BIND_MENU_RESOURCES);
			return subject.hasRole(BIND_MENU_RESOURCES_ROLE);
		}
	}


	/**
	 * 密码重试机制，
	 * 5次机会，超过5次，账号标识为无效
	 */
	class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

		private Cache<String, AtomicInteger> passwordRetryCache;

		public RetryLimitHashedCredentialsMatcher(CacheManager cacheManager) {
			passwordRetryCache = cacheManager.getCache(PASSWORD_RETRY_CACHE);
		}

		@Override
		public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
			String username = (String)token.getPrincipal();

			// 密码尝试次数 +1
			AtomicInteger retryCount = passwordRetryCache.get(username);
			if(retryCount == null) {
				retryCount = new AtomicInteger(0);
				passwordRetryCache.put(username, retryCount);
			}

			// 密码重试次数 超过5次，锁定用户，抛出异常
			if(retryCount.incrementAndGet() > 5) {
				User u = new User();
				u.setUserCode(username);
				u.setValidFlag(USER_INVALID);
				userDao.updateUserValidFlagByUserCode(u);
				throw new ExcessiveAttemptsException();
			}

			boolean matches = super.doCredentialsMatch(token, info);

			// 如果密码匹配，清空重试次数
			if(matches) {
				passwordRetryCache.remove(username);
				Session session = SecurityUtils.getSubject().getSession();
				session.setTimeout(3600000);// session过期时间 一小时, 单位：毫秒
				session.setAttribute(CommonConstant.loginUser.LOGIN_USER_INFO, info.getPrincipals().getPrimaryPrincipal());
			}
			return matches;
		}
	}

}

