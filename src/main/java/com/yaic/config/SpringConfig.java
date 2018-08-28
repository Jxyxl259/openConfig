package com.yaic.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@Order(2)
public class SpringConfig {

    @Bean
    @Autowired
    public EhCacheCacheManager springCacheCacheManager(net.sf.ehcache.CacheManager cacheManager){
        EhCacheCacheManager SpringCacheManager = new EhCacheCacheManager(cacheManager);
        return SpringCacheManager;
    }


}