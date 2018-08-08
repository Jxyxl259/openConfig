//package com.yaic.platform.mapper;
//
//import com.yaic.platform.entity.Partner;
//import org.apache.commons.lang.StringUtils;
//import org.apache.ibatis.annotations.Param;
//
///**
// * @ClassName PartnerSqlProvider
// * @Description
// * @Author jiangxy
// * @Date 2018\8\3 0003 11:25
// * @Version 1.0.0
// */
//public class PartnerSqlProvider {
//
//    public String deleteByIds(@Param(value="ids") String ids){
//        return "delete from t_platform_partner " +
//                "where partner_id in ("+ ids +")";
//    }
//
//
//    public String selectList(@Param(value = "partner")Partner partner){
//        return "select " +
//                "    partner_id, partner_name, partner_img, partner_invalid, partner_remark, partner_field_aa, " +
//                "    created_date, created_user, update_date, updated_user " +
//                "from " +
//                "    t_platform_partner " +
//                "where 1=1 " +
//                (StringUtils.isEmpty(partner.getPartnerName()) ? " " : " and partner_name = " + partner.getPartnerName()) +
//                (StringUtils.isEmpty(partner.getPartnerInvalid()) ? " " : " and partner_invalid = " + partner.getPartnerInvalid());
//    }
//
//    public String selectListByKeys(@Param(value="ids") String ids){
//        return "select " +
//                "    partner_id, partner_name, partner_img, partner_invalid, partner_remark, partner_field_aa, " +
//                "    created_date, created_user, update_date, updated_user " +
//                "from" +
//                "    t_platform_partner " +
//                "where partner_id in ("+ ids +")";
//
//    }
//
//
//}
