package com.yaic.platform.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.Valid;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

import static com.yaic.common.GlobalMessageEnum.PARAM_ILLEGAL;

/**
 * JSR303数据校验切面
 */
@Aspect
@Component
public class ValidAdvisor {


	@Pointcut("execution(com.yaic.platform.common.ResultMessage com.yaic.platform.*.controller.*Controller.add*(..)) " +
			"|| execution(com.yaic.platform.common.ResultMessage com.yaic.platform.*.controller.*Controller.modify*(..))")
	public void methodPointCut(){

	}


	@Around("methodPointCut()")
	public Object doValidate(ProceedingJoinPoint jp) throws Throwable{

		Object[] args = jp.getArgs();

		MethodSignature methodSignature = (MethodSignature)jp.getSignature();

		Method method = methodSignature.getMethod();

		Annotation[][] paramAnnot = method.getParameterAnnotations();

		boolean needValid = false;

		int i = 0;
		do{
			for(int j = 0 ; j < paramAnnot[i].length ; j++){
				Annotation annot = paramAnnot[i][j];
				if(annot instanceof Valid){
					needValid = true;
				}
			}
			i++;
		}while(i < paramAnnot.length);



		if(needValid){
			BindingResult result = (BindingResult)args[args.length-1];

			if(result.hasErrors()){
				ResultMessage resultMsg = new ResultMessage();
				FieldError fieldError = result.getFieldError();
				resultMsg.setResultCode(PARAM_ILLEGAL.getResultCode()+"");
				resultMsg.setResultMsg(fieldError.getField() + fieldError.getDefaultMessage());
				return resultMsg;
			}
		}

		Object proceedResult = jp.proceed();

		return proceedResult;
	}

}