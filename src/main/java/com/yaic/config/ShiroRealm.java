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
			  if(userInfo == null){
		            return null;
		        }
		        authenticationInfo = new SimpleAuthenticationInfo(
		        		userInfo, //用户信息
		        		userInfo.getPassword(), //密码
		                ByteSource.Util.bytes(userInfo.getUserCode() + CommonConstant.loginUser.SALT),//salt = usercode + sns
		                getName()  //realm name
		        );
		        
		        Session session = SecurityUtils.getSubject().getSession();
		        session.setTimeout(3600000);//一小时,毫秒单位
		        
		        session.setAttribute(CommonConstant.loginUser.LOGIN_USER_NAME, userInfo.getUserCode());
		        session.setAttribute(CommonConstant.loginUser.LOGIN_USER_ID,userInfo.getUserId());
		        session.setAttribute(CommonConstant.loginUser.LOGIN_USER_INFO,userInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
        return authenticationInfo;
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