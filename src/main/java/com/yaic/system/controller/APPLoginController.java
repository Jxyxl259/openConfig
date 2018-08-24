package com.yaic.system.controller;

import com.yaic.common.CommonConstant;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.system.entity.User;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class APPLoginController {
	private static final Logger logger = LoggerFactory.getLogger(APPLoginController.class);

    /**
     * 跳转到后台主面板
     * @param session
     * @return
     * @throws Exception
     */
    @ResponseBody
	@RequestMapping(value="/home")
	public ReturnMsg loginSuccess(HttpSession session) throws Exception{
        ReturnMsg result = new ReturnMsg(true);
        User user = (User)session.getAttribute(CommonConstant.loginUser.LOGIN_USER_INFO);
        result.setData("/index.html?login_username="+user.getUserCode());
        return result;
	}


    /**
     * 跳转到登录页
     * @return
     */
    @RequestMapping(value={"/gotoLoginPage","/"})
    public String gotoLoginPage(){
	    return "login";
    }


    /**
     * 无权限页面跳转
     */
	@RequestMapping(value = {"/403"})
    public String unauthorized() throws Exception {
        logger.info("enter unauthorized page.");
        return "403";
    }


    /**
     * 执行登录验证请求
     * 具体验证流程在 FormAuthenticationFilter类中onAccessDenied方法调用的executeLogin方法中完成的
     * 登录成功 拦截请求，直接重定向到成功页面
     * 登录失败 放行请求，来到此方法
     * @param request
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "/doLogin")
    public ReturnMsg login(HttpServletRequest request, HttpSession session) throws Exception {
        ReturnMsg result = new ReturnMsg(false);

        // 已经登录成功的用户，再次访问登录页面执行登录的处理
        Object accessFlag = request.getAttribute("accessFlag");
        if( accessFlag != null && (boolean)accessFlag){
            User u = (User)session.getAttribute(CommonConstant.loginUser.LOGIN_USER_INFO);
            result.setSuccess(true);
            result.setData("/index.html?login_username="+ u.getUserCode());
            return result;
        }

        // 对执行登录过程出现的异常信息回显到前端页面
        String exceptionClassName = (String)request.getAttribute("shiroLoginFailure");
        String error = null;
        if(UnknownAccountException.class.getName().equals(exceptionClassName)) {
            error = "用户名/密码错误";
        } else if(IncorrectCredentialsException.class.getName().equals(exceptionClassName)) {
            error = "用户名/密码错误";
        } else if(LockedAccountException.class.getName().equals(exceptionClassName)){
            error = "账户被锁定，请联系管理员解锁" ;
        } else if(ExcessiveAttemptsException.class.getName().equals(exceptionClassName)) {
            error = "登陆错误次数已超过5次,账户被锁定" ; // TODO 待实现
        }
        if(request.getParameter("forceLogout") != null) {
            result.setMessage("您已经被管理员强制退出，请重新登录");
            return result;
        }
        if(error != null ) logger.error(error);

        result.setMessage(error);
        return result;
    }
}
