package com.yaic.system.dao;

import java.util.List;

import com.yaic.system.entity.User;
import org.apache.ibatis.annotations.Param;

public interface UserDao {
	
    int deleteByPrimaryKey(String userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    
	List<User> selectList(User user);
	int deleteByIds(String[] idsArr);

    /**
     * 根据userCode员工代码精确查询员工对象
     * @param userCode
     * @return
     */
    User getInfoByUserCode(@Param("userCode")String userCode);
    
}