//package com.yaic.platform.mapper;
//
//
//import com.yaic.common.CommonMapper;
//import com.yaic.platform.entity.Partner;
//import org.apache.ibatis.annotations.DeleteProvider;
//import org.apache.ibatis.annotations.Mapper;
//import org.apache.ibatis.annotations.Param;
//import org.apache.ibatis.annotations.SelectProvider;
//
//import java.util.List;
//
//public interface PartnerDao extends CommonMapper<Partner> {
//
//    int deleteByPrimaryKey(Integer partnerId);
//
//    Partner selectByPrimaryKey(Integer partnerId);
//
//    //int updateByPrimaryKeySelective(Partner record);
//
//    //int updateByPrimaryKey(Partner record);
//
//    @DeleteProvider(type = PartnerSqlProvider.class, method = "deleteByIds")
//    int deleteByIds(String ids);
//
//    @SelectProvider(type = PartnerSqlProvider.class, method = "selectList")
//    List<Partner> selectList(@Param(value = "partner")Partner partner);
//
//    //int insertSelective(Partner record);
//
//    @SelectProvider(type = PartnerSqlProvider.class, method = "selectListByKeys")
//	List<Partner> selectListByKeys(@Param(value = "ids") String ids);
//}