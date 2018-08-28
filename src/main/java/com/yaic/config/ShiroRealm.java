package com.yaic.config;

import com.yaic.common.CommonConstant;
import com.yaic.servicelayer.util.CollectionUtil;
import com.yaic.system.entity.Resource;
import com.yaic.system.entity.Role;
import com.yaic.system.entity.User;
import com.yaic.system.service.ResourceService;
import com.yaic.system.service.RoleService;
import com.yaic.system.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

/**
 * 
* @ClassName: MyShiroRealm 
* @Description: TODO
* @author zhaoZD
* @date 2018年6月17日 下午10:05:40 
*
 */
public class ShiroRealm extends AuthorizingRealm {
	
	private static final Logger logger = LoggerFactory.getLogger(ShiroRealm.class);

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
	private ResourceService resourceService;

    
   /**
	* 资源绑定 & 权限授予
    * Title: doGetAuthorizationInfo
    * Description: 获取权限配置信息(角色和资源) 
    * @param principals
    * @return 
    */
    @Override
	@SuppressWarnings("unchecked")
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		User user = (User)principals.getPrimaryPrincipal();
		Session session = SecurityUtils.getSubject().getSession();
		List<Resource> grantedResources = Collections.EMPTY_LIST;

		// 资源绑定
		// 登录用户获取菜单资源 由BindGrantedMenuResourcesFilter 放行请求
    	if(CommonConstant.BIND_MENU_RESOURCES.equals(session.getAttribute(CommonConstant.BIND_MENU_RESOURCES))){
			grantedResources = getBindMenuResources(user.getUserId());
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			info.setRoles(new HashSet(Arrays.asList(CommonConstant.BIND_MENU_RESOURCES_ROLE)));
			session.setAttribute(CommonConstant.GRANTED_RESOURCES, grantedResources);
			return info;
		}

		// 权限授予（如有需要可配置shiro原生权限规则）
		// 以下查询用户拥有的权限 由PermissionsAuthorizationFilter 决定是否放行，
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();

        //...

		return authorizationInfo;
    }

	/**
	 * 查询对用户可见有的菜单资源
	 * @param userId
	 * @return
	 */
	private List<Resource> getBindMenuResources(String userId){
		// 通过员工ID userId查询该员工所拥有的角色 app_user_role
		List<Role> userRoles = roleService.getBindRoleByUserId(userId);
		List<Resource> grantedMenuResources = Collections.EMPTY_LIST;
		String[] roleIds = new String[userRoles.size()];
		if(CollectionUtil.isNotEmpty(userRoles)){
			int i = 0;
			for(Role role : userRoles){
				String roleId = role.getRoleId();
				roleIds[i++] = roleId;
			}
			grantedMenuResources = resourceService.getBindResourceByRoleIds(roleIds);
		}
		return grantedMenuResources;
	}


   /**
	* 认证
    * Title: doGetAuthenticationInfo
    * Description: 用户账号密码验证
    * @param token
    * @return
    * @throws AuthenticationException 
    * @see org.apache.shiro.realm.AuthenticatingRealm#doGetAuthenticationInfo(AuthenticationToken)
    */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
            throws AuthenticationException {
    	
        //获取用户的输入的账号.
        String userCode = (String)token.getPrincipal();
        logger.info("登录验证,获取输入的账号:{}",userCode);

        User userInfo;
        SimpleAuthenticationInfo authenticationInfo = null;
		try {
			userInfo = userService.getUserInfoByUserCode(userCode);
			if(userInfo == null) return null;

			authenticationInfo = new SimpleAuthenticationInfo(
					userInfo, //用户信息
					userInfo.getPassword(), //密码
					ByteSource.Util.bytes(userInfo.getUserCode() + CommonConstant.loginUser.SALT),//salt = usercode + sns
					getName()  //realm name
			);
			/**
			 * 如果加入缓存机制, 尽量不要在这里往session中设置值，
			 * 然后在后面的逻辑中用此处设置的值， 因为缓存会导致对于每个用户来讲，该方法只执行一次（之后走缓存）
			 * 并且用户每次logout，shiro是直接调用当前 httpSession对象的invalidate()方法，
			 * 也即用户登出即销毁当前浏览器回话对象，
			 * 会出现这种情况：
			 * 		用户A登录， 密码输入失败，A的 session信息被写入，info信息被缓存，登录失败，
			 * 		然后用户B登录， 输入密码正确，B的 session信息被写入， info信息被缓存， 登录成功，然后B登出
			 * 		此时 session被销毁，用户A再使用正确的密码登录， 重新创建session对象
			 *		从缓存中获取到 info信息，与token匹配成功
			 * 		重定向到登录成功的URL (这里是/home)，想拿出第一次登录失败时的 session信息
			 * 		但是由于 session被是销毁之后又重新创建的对象，
			 * 		A的 session信息已不复存在，/home映射Handler方法中通过 HttpSession拿不到当初在本方法中设置的值
			 * 		于是报出来空指针异常。
			 */
//			Session session = SecurityUtils.getSubject().getSession();
//			session.setTimeout(3600000);// session过期时间 一小时, 单位：毫秒
//			session.setAttribute(CommonConstant.loginUser.LOGIN_USER_INFO, userInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return authenticationInfo;
    }


	/**
	 * 如果开启认证缓存
	 * 用户登出之后，务必清理已缓存的认证信息，shiro这里是个坑，存缓存的Key和移除缓存的Key不一致， 必须由我们来重写如下方法
	 * 不然登出之后再次登录，会受缓存影响，认为是已经认证的
	 * @param principals
	 */
	protected void clearCachedAuthenticationInfo(PrincipalCollection principals) {

		if(!isAuthenticationCachingEnabled() || getAuthenticationCache() == null ){
			return ;
		}

		if (!(principals == null || principals.isEmpty())) {
			Cache<Object, AuthenticationInfo> cache = getAuthenticationCache();
			String key = ((User)this.getAuthenticationCacheKey(principals)).getUserCode();
			cache.remove(key);
		}
	}




	public static void main(String[] args) {

		//String substring = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 20).toUpperCase();

		//System.out.println(substring);

		String algorithmName = "SHA1";

		String source = "666666";

		ByteSource salt = ByteSource.Util.bytes("openConfigUsersns");

		int iterations = 2;

		SimpleHash sh = new SimpleHash(algorithmName, source, salt, iterations);

		System.out.println(sh);
	}

}