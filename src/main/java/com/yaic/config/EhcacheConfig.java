package com.yaic.config;

import net.sf.ehcache.CacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;

/**
 * @description: ehcache配置类
 * @author:
 * @create: 2018-07-08 15:11
 */
@Configuration
@Order(1)
public class EhcacheConfig {

    @Bean
    public CacheManager cacheManager(){
        EhCacheManagerFactoryBean ehCacheManagerFactory = new EhCacheManagerFactoryBean();
        ehCacheManagerFactory.setConfigLocation(new ClassPathResource("config/ehcache/ehcache.xml"));
        ehCacheManagerFactory.afterPropertiesSet();
        return ehCacheManagerFactory.getObject();
    }

}
