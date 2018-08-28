/*
Navicat MySQL Data Transfer

Source Server         : openConfig_dev
Source Server Version : 50635
Source Host           : 10.1.135.155:3307
Source Database       : open_dev

Target Server Type    : MYSQL
Target Server Version : 50635
File Encoding         : 65001

Date: 2018-08-28 19:40:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for app_company
-- ----------------------------
DROP TABLE IF EXISTS `app_company`;
CREATE TABLE `app_company` (
  `COMPANY_ID` varchar(32) NOT NULL COMMENT '机构ID',
  `CREATED_DATE` datetime DEFAULT NULL COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT NULL COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `COMPANY_CNAME` varchar(200) DEFAULT NULL COMMENT '机构简体名称',
  `COMPANY_ENAME` varchar(200) DEFAULT NULL COMMENT '机构英文名称',
  `COMPANY_TNAME` varchar(200) DEFAULT NULL COMMENT '机构繁体名称',
  `COMPANY_LEVEL` int(10) DEFAULT NULL COMMENT '菜单层级',
  `PARENT_COMPANY_ID` varchar(32) DEFAULT NULL COMMENT '上级菜单ID',
  `VALID_FLAG` char(1) DEFAULT NULL COMMENT '是否有效：0无效，1 有效',
  `REMARK` varchar(500) DEFAULT NULL COMMENT '备注',
  `FLAG` varchar(10) DEFAULT NULL COMMENT '其他标志',
  PRIMARY KEY (`COMPANY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统机构表';

-- ----------------------------
-- Records of app_company
-- ----------------------------
INSERT INTO `app_company` VALUES ('000001', '2015-11-18 15:31:31', null, '2015-11-18 15:31:31', null, '易安保险', '易安保险', '易安保险', '2', '00', '1', null, null);
INSERT INTO `app_company` VALUES ('000002', '2015-11-18 15:34:02', null, '2015-11-18 15:34:02', null, '银之杰', '银之杰', '银之杰', '2', '00', '1', null, null);

-- ----------------------------
-- Table structure for app_job
-- ----------------------------
DROP TABLE IF EXISTS `app_job`;
CREATE TABLE `app_job` (
  `JOB_ID` varchar(32) NOT NULL COMMENT '任务ID',
  `CREATED_DATE` datetime DEFAULT NULL COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT NULL COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `JOB_NAME` varchar(600) NOT NULL COMMENT '任务名称',
  `JOB_GROUP_NAME` varchar(600) NOT NULL COMMENT '任务组',
  `JOB_STATUS` varchar(3) NOT NULL COMMENT '任务状态 0 未运行 1 运行中 2 暂停 3 作废',
  `CRON_EXPRESSION` varchar(100) NOT NULL COMMENT '任务表达式',
  `JOB_CLASS` varchar(150) DEFAULT NULL COMMENT '任务执行类全名',
  `SPRING_ID` varchar(100) DEFAULT NULL COMMENT '任务执行类在SPRING配置中的ID',
  `METHOD_NAME` varchar(100) DEFAULT NULL COMMENT '任务执行方法，无参。【注：选择JOB_CLASS或SPRING_ID时必录】',
  `RESTFUL_URL` varchar(400) DEFAULT NULL COMMENT '任务执行RESTFUL服务URL，无参。【注：JOB_CLASS、SPRING_ID和RESTFUL_URL方式三选一】',
  `REMARK` varchar(600) DEFAULT NULL COMMENT '任务说明',
  `FLAG` varchar(10) DEFAULT NULL COMMENT '其他标志',
  PRIMARY KEY (`JOB_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='定时任务表';

-- ----------------------------
-- Records of app_job
-- ----------------------------
INSERT INTO `app_job` VALUES ('04D2B183DED44BA59D94091362907360', '2016-05-06 11:10:10', '001', '2016-05-06 12:31:37', '001', 'clearDbLog', 'sns', '0', '0 0 0 * * ?', '', 'oauthServiceLogService', 'clearDbLog', '', '清除请求日志信息.', null);
INSERT INTO `app_job` VALUES ('9F3D4E7399FB49A28D3B088D84E15132', '2016-05-13 10:42:14', '001', '2016-06-02 19:35:59', '001', '支付回调通知', 'sns', '1', '*/5 * * * * ?', '', 'snsCallbackInfoService', 'dealQuartzBiz', '', '支付回调通知，每5秒扫描一次', null);
INSERT INTO `app_job` VALUES ('F7AF7D7AEDC847DD86D2C04A9A3A7E63', '2016-08-31 10:54:38', '001', '2016-08-31 11:36:31', '001', '业务通知', 'notice', '0', '*/15 * * * * ?', '', 'snsNoticeInfoService', 'dealQuartzBiz', '', '业务通知，每15秒扫描一次', null);
INSERT INTO `app_job` VALUES ('8A3D4E7399FB49A28D3B088D84E15132', '2016-05-13 10:42:14', '001', '2016-06-02 19:35:59', '001', '处理支付回调通知处理中数据', 'sns', '0', '0 0/15 * * * ?', '', 'snsCallbackInfoService', 'dealProcessQuartzBiz', '', '处理支付回调通知处理中数据，每15分钟扫描一次', '');

-- ----------------------------
-- Table structure for app_parameter
-- ----------------------------
DROP TABLE IF EXISTS `app_parameter`;
CREATE TABLE `app_parameter` (
  `PARAMETER_ID` varchar(64) NOT NULL COMMENT '参数ID',
  `CREATED_DATE` datetime DEFAULT NULL COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT NULL COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `PARAMETER_TYPE` varchar(100) NOT NULL COMMENT '参数类型',
  `PARAMETER_CODE` varchar(100) NOT NULL COMMENT '参数代码',
  `PARAMETER_CNAME` varchar(50) DEFAULT NULL COMMENT '参数简体名称',
  `PARAMETER_ENAME` varchar(50) DEFAULT NULL COMMENT '参数英文名称',
  `PARAMETER_TNAME` varchar(50) DEFAULT NULL COMMENT '参数繁体名称',
  `VALID_FLAG` int(10) DEFAULT NULL COMMENT '是否有效：0无效，1 有效',
  `REMARK` varchar(500) DEFAULT NULL COMMENT '备注',
  `FLAG` varchar(10) DEFAULT NULL COMMENT '其他标志',
  PRIMARY KEY (`PARAMETER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统参数表';

-- ----------------------------
-- Records of app_parameter
-- ----------------------------
INSERT INTO `app_parameter` VALUES ('6dc487c9-8677-4ae4-95f3-659bef18b109', '2016-04-29 15:03:21', '001', '2016-04-29 15:03:24', '001', 'VALID_FLAG', '1', '有效', '', '', '1', '', '');
INSERT INTO `app_parameter` VALUES ('7B8085ED1A71427DA147E0B16A0292F1', null, 'admin', null, 'admin', 'JOB_STATUS', '0', '未运行', '', '', '1', '未运行', '');
INSERT INTO `app_parameter` VALUES ('7E8E24AA0E32461D9744BEB84BB729FE', null, 'admin', null, 'admin', 'JOB_STATUS', '3', '禁用', '', '', '1', '禁用', '');
INSERT INTO `app_parameter` VALUES ('8CA72575B2294BA8975C892F3850ED8F', null, 'admin', null, 'admin', 'JOB_STATUS', '2', '暂停', '', '', '1', '暂停', '');
INSERT INTO `app_parameter` VALUES ('DB67730C9A394ED79C67E7B07499E884', null, 'admin', null, 'admin', 'JOB_STATUS', '1', '运行中', '', '', '1', '运行中', '');
INSERT INTO `app_parameter` VALUES ('e50fd3ed-5319-48ca-bb74-82df879d38df', '2016-04-28 15:03:33', '001', '2016-04-28 15:03:36', '001', 'VALID_FLAG', '0', '无效', '', '', '1', '', '');

-- ----------------------------
-- Table structure for app_resource
-- ----------------------------
DROP TABLE IF EXISTS `app_resource`;
CREATE TABLE `app_resource` (
  `RESOURCE_ID` varchar(32) NOT NULL COMMENT '资源ID',
  `CREATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `RESOURCE_NAME` varchar(50) DEFAULT NULL COMMENT '资源名称',
  `RESOURCE_TYPE` varchar(10) DEFAULT NULL COMMENT '资源类型',
  `RESOURCE_LEVEL` decimal(2,0) DEFAULT NULL COMMENT '资源层级',
  `PARENT_RESOURCE_ID` varchar(32) DEFAULT NULL COMMENT '上级资源ID',
  `RESOURCE_ICON_CLASS` varchar(100) DEFAULT NULL COMMENT '资源图标CLASS',
  `ACTION_URL` varchar(100) DEFAULT NULL COMMENT '提交URL',
  `END_FLAG` char(1) DEFAULT '1' COMMENT '节点标志,默认新添加的都是叶子节点',
  `DISPLAY_ORDER` int(10) DEFAULT NULL COMMENT '显示顺序',
  PRIMARY KEY (`RESOURCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统资源表';

-- ----------------------------
-- Records of app_resource
-- ----------------------------
INSERT INTO `app_resource` VALUES ('101', '2018-08-10 09:43:24', 'admin', '2018-08-10 09:43:43', 'admin', '平台管理', 'menu', '1', '1', '1', '1', '0', '1');
INSERT INTO `app_resource` VALUES ('10101', '2018-08-10 09:44:59', 'admin', '2018-08-10 09:45:14', null, '合作伙伴管理', 'menu', '2', '101', '1', '/html/platform/partner.html', '1', '1');
INSERT INTO `app_resource` VALUES ('10102', '2018-08-10 09:50:54', 'admin', '2018-08-10 09:51:09', null, '产品管理', '0', '2', '101', '0', 'html/platform/product.html', '1', '2');
INSERT INTO `app_resource` VALUES ('10103', '2018-08-10 09:51:55', 'admin', '2018-08-10 09:52:10', null, '第三方用户管理', '0', '2', '101', '0', 'html/platform/thirdUser.html', '1', '3');
INSERT INTO `app_resource` VALUES ('102', '2018-08-10 09:52:22', 'admin', '2018-08-10 09:52:37', null, '系统管理', '0', '1', '1', '0', '0', '0', '2');
INSERT INTO `app_resource` VALUES ('10201', '2018-08-10 09:55:18', 'admin', '2018-08-10 09:55:33', null, '用户管理', '0', '2', '102', '0', 'html/system/user.html', '1', '1');
INSERT INTO `app_resource` VALUES ('10202', '2018-08-10 09:56:03', 'admin', '2018-08-10 09:56:18', null, '角色管理', '0', '2', '102', '0', 'html/system/role.html', '1', '2');
INSERT INTO `app_resource` VALUES ('10203', '2018-08-10 09:56:48', 'admin', '2018-08-10 09:57:03', null, '资源管理', '0', '2', '102', '0', 'html/system/resource.html', '1', '3');

-- ----------------------------
-- Table structure for app_role
-- ----------------------------
DROP TABLE IF EXISTS `app_role`;
CREATE TABLE `app_role` (
  `ROLE_ID` varchar(32) NOT NULL COMMENT '角色ID',
  `CREATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `ROLE_NAME` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `VALID_FLAG` int(10) DEFAULT NULL COMMENT '是否有效：0无效，1 有效',
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统资源表';

-- ----------------------------
-- Records of app_role
-- ----------------------------
INSERT INTO `app_role` VALUES ('0001', '2015-11-04 11:05:19', 'admin', '2018-07-06 18:49:09', 'openuser', '超级管理员', '1');
INSERT INTO `app_role` VALUES ('0002', '2015-11-13 18:18:30', 'admin', '2018-07-06 10:54:48', 'admin', '管理员', '1');
INSERT INTO `app_role` VALUES ('0004', '2018-06-27 11:44:27', 'admin', '2018-07-06 10:57:22', 'admin', 'chaojigunaliyuan', '1');
INSERT INTO `app_role` VALUES ('0005', '2018-06-27 11:49:36', 'admin', '2018-06-27 11:49:36', 'admin', 'sadsfgtghj', '1');
INSERT INTO `app_role` VALUES ('0006', '2018-08-24 11:10:40', 'jiangxy', '2018-08-24 11:10:40', 'jiangxy', 'bizMan', '1');

-- ----------------------------
-- Table structure for app_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `app_role_resource`;
CREATE TABLE `app_role_resource` (
  `ROLE_RESOURCE_ID` int(32) NOT NULL AUTO_INCREMENT COMMENT '角色资源关联ID',
  `CREATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `ROLE_ID` varchar(32) DEFAULT NULL COMMENT '角色ID',
  `RESOURCE_ID` varchar(32) DEFAULT NULL COMMENT '资源ID',
  PRIMARY KEY (`ROLE_RESOURCE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2544 DEFAULT CHARSET=utf8 COMMENT='系统资源表';

-- ----------------------------
-- Records of app_role_resource
-- ----------------------------
INSERT INTO `app_role_resource` VALUES ('2515', '2018-08-13 09:46:45', 'admin', null, null, '0005', '101');
INSERT INTO `app_role_resource` VALUES ('2516', '2018-08-13 09:46:45', 'admin', null, null, '0005', '10101');
INSERT INTO `app_role_resource` VALUES ('2517', '2018-08-13 09:52:38', 'admin', null, null, '0004', '102');
INSERT INTO `app_role_resource` VALUES ('2518', '2018-08-13 09:52:38', 'admin', null, null, '0004', '10203');
INSERT INTO `app_role_resource` VALUES ('2519', '2018-08-13 09:52:38', 'admin', null, null, '0004', '10202');
INSERT INTO `app_role_resource` VALUES ('2520', '2018-08-13 09:52:38', 'admin', null, null, '0004', '10201');
INSERT INTO `app_role_resource` VALUES ('2521', '2018-08-13 09:52:44', 'admin', null, null, '0002', '102');
INSERT INTO `app_role_resource` VALUES ('2522', '2018-08-13 09:52:44', 'admin', null, null, '0002', '10201');
INSERT INTO `app_role_resource` VALUES ('2532', '2018-08-23 18:01:48', 'jiangxy', '2018-08-23 18:01:48', null, '0001', '101');
INSERT INTO `app_role_resource` VALUES ('2533', '2018-08-23 18:02:49', 'jiangxy', '2018-08-23 18:02:49', null, '0001', '10101');
INSERT INTO `app_role_resource` VALUES ('2534', '2018-08-23 18:03:15', 'jiangxy', '2018-08-23 18:03:15', null, '0001', '102');
INSERT INTO `app_role_resource` VALUES ('2535', '2018-08-23 18:03:30', 'jiangxy', '2018-08-23 18:03:30', null, '0001', '10203');
INSERT INTO `app_role_resource` VALUES ('2536', '2018-08-23 18:04:30', 'jiangxy', '2018-08-23 18:04:30', null, '0001', '10202');
INSERT INTO `app_role_resource` VALUES ('2537', '2018-08-23 18:05:03', 'jiangxy', '2018-08-23 18:05:03', null, '0001', '10201');
INSERT INTO `app_role_resource` VALUES ('2538', '2018-08-23 18:05:18', 'jiangxy', '2018-08-23 18:05:18', null, '0001', '10102');
INSERT INTO `app_role_resource` VALUES ('2539', '2018-08-23 18:05:32', 'jiangxy', '2018-08-23 18:05:32', null, '0001', '10103');
INSERT INTO `app_role_resource` VALUES ('2540', '2018-08-24 11:11:23', 'j', '2018-08-24 11:11:23', null, '0006', '101');
INSERT INTO `app_role_resource` VALUES ('2541', '2018-08-24 11:11:41', 'j', '2018-08-24 11:11:41', null, '0006', '10101');
INSERT INTO `app_role_resource` VALUES ('2542', '2018-08-24 11:11:50', 'j', '2018-08-24 11:11:50', null, '0006', '10102');
INSERT INTO `app_role_resource` VALUES ('2543', '2018-08-24 11:12:09', 'j', '2018-08-24 11:12:09', null, '0006', '10103');

-- ----------------------------
-- Table structure for app_user
-- ----------------------------
DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `USER_ID` varchar(32) NOT NULL DEFAULT '' COMMENT '员工ID',
  `CREATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `USER_CODE` varchar(50) DEFAULT NULL COMMENT '员工代码',
  `USER_CNAME` varchar(50) DEFAULT NULL COMMENT '员工简体中文名称',
  `USER_TNAME` varchar(50) DEFAULT NULL COMMENT '员工繁体中文名称',
  `USER_ENAME` varchar(50) DEFAULT NULL COMMENT '员工英文名称',
  `PASSWORD` varchar(50) DEFAULT NULL COMMENT '密码',
  `SALT` varchar(100) DEFAULT NULL COMMENT '加密密码的盐',
  `SEAL` varchar(100) DEFAULT NULL COMMENT '印鉴',
  `PASSWORD_SET_DATE` datetime DEFAULT NULL COMMENT '密码设置日期',
  `PASSWORD_EXPIRE_DATE` datetime DEFAULT NULL COMMENT '密码过期日期',
  `COMPANY_CODE` varchar(10) DEFAULT NULL COMMENT '归属机构代码',
  `PHONE` varchar(18) DEFAULT NULL COMMENT '电话号码',
  `MOBILE` varchar(18) DEFAULT NULL COMMENT '手机号码',
  `ADDRESS` varchar(255) DEFAULT NULL COMMENT '通信地址',
  `POST_CODE` varchar(6) DEFAULT NULL COMMENT '邮政编码',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `VALID_FLAG` char(1) NOT NULL DEFAULT '1' COMMENT '1-有效；0-无效',
  `REMARK` varchar(200) DEFAULT NULL COMMENT '备注',
  `FLAG` varchar(255) DEFAULT NULL COMMENT '标志字段',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `uk` (`USER_CODE`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='员工代码表';

-- ----------------------------
-- Records of app_user
-- ----------------------------
INSERT INTO `app_user` VALUES ('000C6762C01743E1900C', '2018-08-21 20:34:21', 'jiangxy', '2018-08-21 20:34:21', 'jiangxy', 'admin', '超级管理员', null, 'administor', '46d9aa4046abadc1f0893f90a0b147d1b6cd42e0', 'adminsns', null, '2018-08-21 20:34:48', '2019-08-21 00:00:00', null, null, '18605384656', null, null, null, '1', '该账号为超级管理员', null);
INSERT INTO `app_user` VALUES ('462E9C258C27DC6393A9', '2018-08-16 11:08:35', 'admin', '2018-08-16 11:32:44', 'admin', 'openuser', '2225555555555', null, 'openuser', '1qaz@WSX', null, null, '2018-08-16 11:08:28', '2018-09-21 11:08:28', null, null, '1', null, null, '144', '1', '44444444444', null);
INSERT INTO `app_user` VALUES ('4A74B3D783334E1B0791', '2018-08-16 11:08:57', 'admin', '2018-08-16 11:43:03', 'admin', '3333333', '3333', null, '3333', '33333', null, null, '2018-08-21 11:08:48', '2018-08-31 11:08:48', null, null, '333333333', null, null, '3333333333', '0', '3333', null);
INSERT INTO `app_user` VALUES ('7BB7A003F513460C84B2', '2018-08-22 16:37:35', 'jiangxy', '2018-08-22 16:37:35', 'jiangxy', 'openConfigUser', '普通账号', null, 'commonUser_01', '0c9aeec21676414e8a5649a4154823aee06c1b05', 'openConfigUsersns', null, '2018-08-22 16:36:35', '2019-08-22 00:00:00', null, null, null, null, null, null, '1', null, null);
INSERT INTO `app_user` VALUES ('8CD259AACE0946DEAD70', '2018-08-27 11:31:50', 'admin', '2018-08-28 17:14:49', 'admin', 'user_a', 'A用户', null, 'user_a', 'c8b2cba50b86142b47adee2e7b1f99ca22b5e160', null, null, '2018-08-27 11:31:16', '2020-03-28 10:57:23', null, null, '100000111', null, null, 'ssss@123.com', '1', 'A用户', null);

-- ----------------------------
-- Table structure for app_user_role
-- ----------------------------
DROP TABLE IF EXISTS `app_user_role`;
CREATE TABLE `app_user_role` (
  `USER_ROLE_ID` varchar(32) NOT NULL COMMENT '用户角色关联ID',
  `CREATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `CREATED_BY` varchar(32) DEFAULT NULL COMMENT '创建人',
  `UPDATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新日期',
  `UPDATED_BY` varchar(32) DEFAULT NULL COMMENT '更新人',
  `USER_ID` varchar(32) DEFAULT NULL COMMENT '用户ID',
  `ROLE_ID` varchar(32) DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`USER_ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

-- ----------------------------
-- Records of app_user_role
-- ----------------------------
INSERT INTO `app_user_role` VALUES ('552FE1873446E86F850B', '2018-08-27 16:28:47', 'admin', null, null, '8CD259AACE0946DEAD70', '0006');
INSERT INTO `app_user_role` VALUES ('B504C537B94E73AF4786', '2018-08-16 15:33:17', 'admin', null, null, '4A74B3D783334E1B0791', '0005');
INSERT INTO `app_user_role` VALUES ('C4G62JE90AB304841BEO', '2018-08-23 17:59:55', 'jiangxy', '2018-08-23 17:59:55', null, '000C6762C01743E1900C', '0001');
INSERT INTO `app_user_role` VALUES ('noSysManagementGrant', '2018-08-24 11:13:19', 'j', '2018-08-24 11:13:19', null, '7BB7A003F513460C84B2', '0006');

-- ----------------------------
-- Table structure for qz_blob_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qz_blob_triggers`;
CREATE TABLE `qz_blob_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `BLOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `SCHED_NAME` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`) USING BTREE,
  CONSTRAINT `qz_blob_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_blob_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qz_calendars
-- ----------------------------
DROP TABLE IF EXISTS `qz_calendars`;
CREATE TABLE `qz_calendars` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `CALENDAR_NAME` varchar(200) NOT NULL,
  `CALENDAR` blob NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`CALENDAR_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_calendars
-- ----------------------------

-- ----------------------------
-- Table structure for qz_cron_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qz_cron_triggers`;
CREATE TABLE `qz_cron_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `CRON_EXPRESSION` varchar(120) NOT NULL,
  `TIME_ZONE_ID` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qz_cron_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_cron_triggers
-- ----------------------------
INSERT INTO `qz_cron_triggers` VALUES ('ClusteredScheduler', '支付回调通知', 'sns', '*/5 * * * * ?', 'Asia/Shanghai');

-- ----------------------------
-- Table structure for qz_fired_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qz_fired_triggers`;
CREATE TABLE `qz_fired_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `ENTRY_ID` varchar(95) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `INSTANCE_NAME` varchar(200) NOT NULL,
  `FIRED_TIME` bigint(13) NOT NULL,
  `SCHED_TIME` bigint(13) NOT NULL,
  `PRIORITY` int(11) NOT NULL,
  `STATE` varchar(16) NOT NULL,
  `JOB_NAME` varchar(200) DEFAULT NULL,
  `JOB_GROUP` varchar(200) DEFAULT NULL,
  `IS_NONCONCURRENT` varchar(1) DEFAULT NULL,
  `REQUESTS_RECOVERY` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`ENTRY_ID`),
  KEY `IDX_QZ_FT_TRIG_INST_NAME` (`SCHED_NAME`,`INSTANCE_NAME`) USING BTREE,
  KEY `IDX_QZ_FT_INST_JOB_REQ_RCVRY` (`SCHED_NAME`,`INSTANCE_NAME`,`REQUESTS_RECOVERY`) USING BTREE,
  KEY `IDX_QZ_FT_J_G` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`) USING BTREE,
  KEY `IDX_QZ_FT_JG` (`SCHED_NAME`,`JOB_GROUP`) USING BTREE,
  KEY `IDX_QZ_FT_T_G` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`) USING BTREE,
  KEY `IDX_QZ_FT_TG` (`SCHED_NAME`,`TRIGGER_GROUP`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_fired_triggers
-- ----------------------------
INSERT INTO `qz_fired_triggers` VALUES ('ClusteredScheduler', '3X80IUTOJ5BQJIA15326942943771532694294399', '支付回调通知', 'sns', '3X80IUTOJ5BQJIA1532694294377', '1532695485866', '1532695490000', '5', 'ACQUIRED', null, null, '0', '0');

-- ----------------------------
-- Table structure for qz_job_details
-- ----------------------------
DROP TABLE IF EXISTS `qz_job_details`;
CREATE TABLE `qz_job_details` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `JOB_NAME` varchar(200) NOT NULL,
  `JOB_GROUP` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `JOB_CLASS_NAME` varchar(250) NOT NULL,
  `IS_DURABLE` varchar(1) NOT NULL,
  `IS_NONCONCURRENT` varchar(1) NOT NULL,
  `IS_UPDATE_DATA` varchar(1) NOT NULL,
  `REQUESTS_RECOVERY` varchar(1) NOT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QZ_J_REQ_RECOVERY` (`SCHED_NAME`,`REQUESTS_RECOVERY`) USING BTREE,
  KEY `IDX_QZ_J_GRP` (`SCHED_NAME`,`JOB_GROUP`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_job_details
-- ----------------------------
INSERT INTO `qz_job_details` VALUES ('ClusteredScheduler', '支付回调通知', 'sns', null, 'com.yaic.quartz.util.JobWapper', '0', '0', '0', '0', 0xACED0005737200156F72672E71756172747A2E4A6F62446174614D61709FB083E8BFA9B0CB020000787200266F72672E71756172747A2E7574696C732E537472696E674B65794469727479466C61674D61708208E8C3FBC55D280200015A0013616C6C6F77735472616E7369656E74446174617872001D6F72672E71756172747A2E7574696C732E4469727479466C61674D617013E62EAD28760ACE0200025A000564697274794C00036D617074000F4C6A6176612F7574696C2F4D61703B787001737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F4000000000000C770800000010000000017400064A6F6244746F73720021636F6D2E796169632E71756172747A2E64746F2E646F6D61696E2E4A6F6244746FFFFFFFFFB5EB49A902000F4C00096372656174656442797400124C6A6176612F6C616E672F537472696E673B4C000B63726561746564446174657400104C6A6176612F7574696C2F446174653B4C000E63726F6E45787072657373696F6E71007E00094C0004666C616771007E00094C00086A6F62436C61737371007E00094C000C6A6F6247726F75704E616D6571007E00094C00056A6F62496471007E00094C00076A6F624E616D6571007E00094C00096A6F6253746174757371007E00094C000A6D6574686F644E616D6571007E00094C000672656D61726B71007E00094C000A7265737466756C55726C71007E00094C0008737072696E67496471007E00094C000975706461746564427971007E00094C000B757064617465644461746571007E000A78707400033030317372000E6A6176612E7574696C2E44617465686A81014B5974190300007870770800000154A7FE2F707874000D2A2F35202A202A202A202A203F70740000740003736E737400203946334434453733393946423439413238443342303838443834453135313332740012E694AFE4BB98E59B9EE8B083E9809AE79FA57400013174000D6465616C51756172747A42697A740028E694AFE4BB98E59B9EE8B083E9809AE79FA5EFBC8CE6AF8F35E7A792E689ABE68F8FE4B880E6ACA1740000740016736E7343616C6C6261636B496E666F53657276696365707371007E000D77080000015510E60918787800);

-- ----------------------------
-- Table structure for qz_locks
-- ----------------------------
DROP TABLE IF EXISTS `qz_locks`;
CREATE TABLE `qz_locks` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `LOCK_NAME` varchar(40) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`LOCK_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_locks
-- ----------------------------
INSERT INTO `qz_locks` VALUES ('ClusteredScheduler', 'STATE_ACCESS');
INSERT INTO `qz_locks` VALUES ('ClusteredScheduler', 'TRIGGER_ACCESS');

-- ----------------------------
-- Table structure for qz_paused_trigger_grps
-- ----------------------------
DROP TABLE IF EXISTS `qz_paused_trigger_grps`;
CREATE TABLE `qz_paused_trigger_grps` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_paused_trigger_grps
-- ----------------------------

-- ----------------------------
-- Table structure for qz_scheduler_state
-- ----------------------------
DROP TABLE IF EXISTS `qz_scheduler_state`;
CREATE TABLE `qz_scheduler_state` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `INSTANCE_NAME` varchar(200) NOT NULL,
  `LAST_CHECKIN_TIME` bigint(13) NOT NULL,
  `CHECKIN_INTERVAL` bigint(13) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`INSTANCE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_scheduler_state
-- ----------------------------
INSERT INTO `qz_scheduler_state` VALUES ('ClusteredScheduler', '3X80IUTOJ5BQJIA1532694294377', '1532695469083', '20000');

-- ----------------------------
-- Table structure for qz_simple_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qz_simple_triggers`;
CREATE TABLE `qz_simple_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `REPEAT_COUNT` bigint(7) NOT NULL,
  `REPEAT_INTERVAL` bigint(12) NOT NULL,
  `TIMES_TRIGGERED` bigint(10) NOT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qz_simple_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_simple_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qz_simprop_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qz_simprop_triggers`;
CREATE TABLE `qz_simprop_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `STR_PROP_1` varchar(512) DEFAULT NULL,
  `STR_PROP_2` varchar(512) DEFAULT NULL,
  `STR_PROP_3` varchar(512) DEFAULT NULL,
  `INT_PROP_1` int(11) DEFAULT NULL,
  `INT_PROP_2` int(11) DEFAULT NULL,
  `LONG_PROP_1` bigint(20) DEFAULT NULL,
  `LONG_PROP_2` bigint(20) DEFAULT NULL,
  `DEC_PROP_1` decimal(13,4) DEFAULT NULL,
  `DEC_PROP_2` decimal(13,4) DEFAULT NULL,
  `BOOL_PROP_1` varchar(1) DEFAULT NULL,
  `BOOL_PROP_2` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  CONSTRAINT `qz_simprop_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`) REFERENCES `qz_triggers` (`SCHED_NAME`, `TRIGGER_NAME`, `TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_simprop_triggers
-- ----------------------------

-- ----------------------------
-- Table structure for qz_triggers
-- ----------------------------
DROP TABLE IF EXISTS `qz_triggers`;
CREATE TABLE `qz_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL,
  `TRIGGER_NAME` varchar(200) NOT NULL,
  `TRIGGER_GROUP` varchar(200) NOT NULL,
  `JOB_NAME` varchar(200) NOT NULL,
  `JOB_GROUP` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT NULL,
  `NEXT_FIRE_TIME` bigint(13) DEFAULT NULL,
  `PREV_FIRE_TIME` bigint(13) DEFAULT NULL,
  `PRIORITY` int(11) DEFAULT NULL,
  `TRIGGER_STATE` varchar(16) NOT NULL,
  `TRIGGER_TYPE` varchar(8) NOT NULL,
  `START_TIME` bigint(13) NOT NULL,
  `END_TIME` bigint(13) DEFAULT NULL,
  `CALENDAR_NAME` varchar(200) DEFAULT NULL,
  `MISFIRE_INSTR` smallint(2) DEFAULT NULL,
  `JOB_DATA` blob,
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QZ_T_J` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`) USING BTREE,
  KEY `IDX_QZ_T_JG` (`SCHED_NAME`,`JOB_GROUP`) USING BTREE,
  KEY `IDX_QZ_T_C` (`SCHED_NAME`,`CALENDAR_NAME`) USING BTREE,
  KEY `IDX_QZ_T_G` (`SCHED_NAME`,`TRIGGER_GROUP`) USING BTREE,
  KEY `IDX_QZ_T_STATE` (`SCHED_NAME`,`TRIGGER_STATE`) USING BTREE,
  KEY `IDX_QZ_T_N_STATE` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`) USING BTREE,
  KEY `IDX_QZ_T_N_G_STATE` (`SCHED_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`) USING BTREE,
  KEY `IDX_QZ_T_NEXT_FIRE_TIME` (`SCHED_NAME`,`NEXT_FIRE_TIME`) USING BTREE,
  KEY `IDX_QZ_T_NFT_ST` (`SCHED_NAME`,`TRIGGER_STATE`,`NEXT_FIRE_TIME`) USING BTREE,
  KEY `IDX_QZ_T_NFT_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`) USING BTREE,
  KEY `IDX_QZ_T_NFT_ST_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_STATE`) USING BTREE,
  KEY `IDX_QZ_T_NFT_ST_MISFIRE_GRP` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_GROUP`,`TRIGGER_STATE`) USING BTREE,
  CONSTRAINT `qz_triggers_ibfk_1` FOREIGN KEY (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`) REFERENCES `qz_job_details` (`SCHED_NAME`, `JOB_NAME`, `JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of qz_triggers
-- ----------------------------
INSERT INTO `qz_triggers` VALUES ('ClusteredScheduler', '支付回调通知', 'sns', '支付回调通知', 'sns', null, '1532695490000', '1532695485000', '5', 'ACQUIRED', 'CRON', '1530502732000', '0', null, '0', '');

-- ----------------------------
-- Table structure for t_platform_account
-- ----------------------------
DROP TABLE IF EXISTS `t_platform_account`;
CREATE TABLE `t_platform_account` (
  `account_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_name` varchar(80) DEFAULT NULL COMMENT '用户名称',
  `account_password` varchar(80) DEFAULT NULL COMMENT '用户密码',
  `mobile` varchar(45) DEFAULT NULL COMMENT '手机号',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱地址',
  `auth_flag` char(1) NOT NULL COMMENT '有效标识,1已经认证,0无',
  `valid_flag` char(1) NOT NULL COMMENT '有效标识,1有效,0无效',
  `created_date` datetime NOT NULL COMMENT '创建时间,默认插入时间',
  `created_user` varchar(50) NOT NULL COMMENT '创建用户,插入用户',
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间,默认插入更新时间',
  `updated_user` varchar(50) NOT NULL COMMENT '更新用户',
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8 COMMENT='第三方用户管理表';

-- ----------------------------
-- Records of t_platform_account
-- ----------------------------
INSERT INTO `t_platform_account` VALUES ('65', 'admin', '0a181a6c8dfe3f78058bcf50815b04d7', '2342342342', '15701579485@163.com', '1', '0', '2018-07-01 00:00:00', 'admin', '2018-08-08 11:18:47', 'admin');
INSERT INTO `t_platform_account` VALUES ('73', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '1', '0', '2018-07-01 00:00:00', 'admin', '2018-08-06 18:40:57', 'admin');
INSERT INTO `t_platform_account` VALUES ('74', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:05', 'admin');
INSERT INTO `t_platform_account` VALUES ('87', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('88', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('89', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('92', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('93', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('94', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('95', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:08', 'admin');
INSERT INTO `t_platform_account` VALUES ('96', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('97', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('98', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('99', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('100', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('101', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('102', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('103', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('104', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('105', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('106', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('107', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('108', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('109', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('110', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('111', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('112', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('113', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:11', 'admin');
INSERT INTO `t_platform_account` VALUES ('114', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('115', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('116', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('117', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('118', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('119', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('120', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('121', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('122', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('123', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('124', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('125', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('126', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('127', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('128', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('129', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('130', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('131', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:14', 'admin');
INSERT INTO `t_platform_account` VALUES ('132', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('133', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('134', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('135', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('136', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('137', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('138', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('139', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('140', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('141', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('142', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('143', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('144', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('145', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('146', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('147', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('148', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('149', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:16', 'admin');
INSERT INTO `t_platform_account` VALUES ('150', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('151', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('152', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('153', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('154', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('155', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('156', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('157', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('158', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('159', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('160', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('161', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('162', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('163', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('164', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('165', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('166', 'jxy', '13456', '2342342342', 'wfj_259_job@163.com', '0', '1', '2018-07-01 00:00:00', 'admin', '2018-07-03 20:51:18', 'admin');
INSERT INTO `t_platform_account` VALUES ('168', 'wangfujia', '66666', '10101010101', 'wfj_259_job@163.com', '1', '1', '2018-07-04 00:00:00', 'admin', '2018-08-08 11:17:23', 'admin');
INSERT INTO `t_platform_account` VALUES ('169', 'zhang', 'e8b6ba86bafab35cfdf900a5402ba046', '2222', '15701579487@163.com', '0', '0', '2018-07-04 17:37:43', 'zhang', '2018-08-10 16:02:09', 'zhang');
INSERT INTO `t_platform_account` VALUES ('170', 'zhangshaoyang', 'e86e4b129cdaeb569f56a944663294eb', '2222', '15701579486@163.com', '1', '0', '2018-07-04 17:41:34', 'zhangshaoyang', '2018-08-10 10:27:54', 'zhangshaoyang');

-- ----------------------------
-- Table structure for t_platform_partner
-- ----------------------------
DROP TABLE IF EXISTS `t_platform_partner`;
CREATE TABLE `t_platform_partner` (
  `partner_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `partner_name` varchar(100) DEFAULT NULL COMMENT '合作方名称',
  `partner_img` varchar(255) DEFAULT NULL COMMENT '合作方图片资源',
  `partner_invalid` char(1) DEFAULT '1' COMMENT '有效标识,1有效,0无效, -1是删除',
  `partner_remark` varchar(255) DEFAULT NULL COMMENT '备注或者描述',
  `partner_field_aa` varchar(255) DEFAULT NULL COMMENT '备用字段',
  `created_date` datetime DEFAULT NULL COMMENT '创建时间,默认插入时间',
  `created_user` varchar(50) DEFAULT NULL COMMENT '创建用户,插入用户',
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updated_user` varchar(50) DEFAULT NULL COMMENT '更新用户',
  PRIMARY KEY (`partner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8 COMMENT='合作方管理表';

-- ----------------------------
-- Records of t_platform_partner
-- ----------------------------
INSERT INTO `t_platform_partner` VALUES ('31', '1', 'D39D425D92_Penguins.jpg', '1', '1', null, '2018-07-27 14:16:49', '1', '2018-07-27 14:17:32', null);
INSERT INTO `t_platform_partner` VALUES ('32', '2', 'FD8A5ADA9D_Desert.jpg', '1', '2', null, '2018-07-27 14:17:05', '2', '2018-07-27 14:17:48', null);
INSERT INTO `t_platform_partner` VALUES ('33', '3', '043DB91826_Hydrangeas.jpg', '1', '3', null, '2018-07-27 14:17:27', '3', '2018-07-27 14:18:09', null);
INSERT INTO `t_platform_partner` VALUES ('34', '4', '42BF86C588_Jellyfish.jpg', '1', '4', null, '2018-07-27 14:17:40', '4', '2018-07-27 14:18:22', null);
INSERT INTO `t_platform_partner` VALUES ('35', '1', '4718AC7237_Chrysanthemum.jpg', '0', '5', null, '2018-07-27 14:17:57', '5', '2018-08-07 09:47:36', null);
INSERT INTO `t_platform_partner` VALUES ('36', '6', '569D8C9707_Koala.jpg', '1', '6', null, '2018-07-27 14:18:20', '6', '2018-07-27 14:19:02', null);
INSERT INTO `t_platform_partner` VALUES ('37', '8', '4B3D43D622_Lighthouse.jpg', '1', '8', null, '2018-07-27 14:18:35', '8', '2018-07-27 14:19:17', null);
INSERT INTO `t_platform_partner` VALUES ('38', '9', 'B36819DB83_Tulips.jpg', '1', '9', null, '2018-07-27 14:18:49', '9', '2018-07-27 14:19:31', null);
INSERT INTO `t_platform_partner` VALUES ('39', '10', 'D0847CBA40_Koala.jpg', '1', '10', null, '2018-07-27 14:19:06', '10', '2018-07-27 14:19:49', null);
INSERT INTO `t_platform_partner` VALUES ('40', '11', '4825645A99_Chrysanthemum.jpg', '1', '11', null, '2018-07-27 14:19:21', '11', '2018-07-27 14:20:04', null);
INSERT INTO `t_platform_partner` VALUES ('41', '7', '2E9D87E9CD_Hydrangeas.jpg', '1', '7', null, '2018-07-27 14:19:41', '7', '2018-07-27 14:20:24', null);
INSERT INTO `t_platform_partner` VALUES ('42', '辅导费', '75AB237A99_Penguins.jpg', '1', '', null, '2018-07-30 16:12:02', null, '2018-07-30 16:14:56', null);
INSERT INTO `t_platform_partner` VALUES ('43', '范德萨范德萨', 'FC4D69AC99_Lighthouse.jpg', '1', '', null, '2018-07-30 16:18:09', null, '2018-07-30 16:18:52', null);
INSERT INTO `t_platform_partner` VALUES ('44', '范德萨范德萨', '9E72FA14F4_Lighthouse.jpg', '1', '', null, '2018-07-30 16:19:35', null, '2018-07-30 16:20:18', null);
INSERT INTO `t_platform_partner` VALUES ('45', 'tgvcxVC许昌999999999', '4AABA33D2F_Chrysanthemum.jpg', '1', '0000000000', null, '2018-07-30 16:30:24', null, '2018-08-02 12:18:02', null);
INSERT INTO `t_platform_partner` VALUES ('48', '沙发的说法', '3F9674EE98_Desert.jpg', '0', '44444444444444', null, '2018-07-30 16:33:45', null, '2018-08-02 12:18:22', null);
INSERT INTO `t_platform_partner` VALUES ('51', '的萨达易安44444', '077BC40515_1.png', '0', '666', null, '2018-07-30 16:40:51', null, '2018-08-02 12:24:02', null);
INSERT INTO `t_platform_partner` VALUES ('54', 'aass1113333', '8448AAAE4E_9acf77a82d33cc2c811fbf731c1786ec.jpg', '1', '4444', null, '2018-07-31 17:08:23', null, '2018-08-02 13:52:36', null);
INSERT INTO `t_platform_partner` VALUES ('55', 'qqq', '75F297D482_57c3249538716287bd727200ebfa6032.jpg', '1', '0000000000000000', null, '2018-08-01 10:28:22', null, '2018-08-02 12:26:22', null);
INSERT INTO `t_platform_partner` VALUES ('57', '123212', 'F46CA91A83_133608f55ec0938743ced6854335d5e3.jpg', '1', 'sddd', null, '2018-08-02 14:38:01', null, '2018-08-02 14:38:15', null);
INSERT INTO `t_platform_partner` VALUES ('58', 'aaa', '733B3B132F_9407e93c3948cebaad3d8ce7b96151cb.jpg', '0', 'sddd', null, '2018-08-02 15:15:56', null, '2018-08-02 17:21:46', null);
INSERT INTO `t_platform_partner` VALUES ('77', '1111111111', '4F3D7E7AD2_Koala.jpg', '1', '', null, '2018-08-07 09:50:04', null, '2018-08-07 10:02:31', null);
INSERT INTO `t_platform_partner` VALUES ('78', '87878787', '26F2EE54C7_partner.jpg', '0', '87878787', null, '2018-08-07 14:29:53', null, '2018-08-07 17:21:35', 'admin');
INSERT INTO `t_platform_partner` VALUES ('79', '测试_01', 'BC801AF969_partner_img.png', '0', '测试_01', null, '2018-08-07 17:47:59', 'admin', '2018-08-07 17:48:24', 'admin');

-- ----------------------------
-- Table structure for t_platform_product
-- ----------------------------
DROP TABLE IF EXISTS `t_platform_product`;
CREATE TABLE `t_platform_product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_name` varchar(100) DEFAULT NULL COMMENT '产品名称',
  `product_img` varchar(255) DEFAULT NULL COMMENT '产品图片资源',
  `product_invalid` char(1) DEFAULT NULL COMMENT '有效标识,1有效,0无效',
  `product_remark` varchar(255) DEFAULT NULL COMMENT '备注或者描述',
  `product_div_html` varchar(255) DEFAULT NULL COMMENT '自定义的html代码，比如遮挡层的效果展示',
  `product_filed_aa` varchar(255) DEFAULT NULL COMMENT '备用字段',
  `created_date` datetime NOT NULL COMMENT '创建时间,默认插入时间',
  `created_user` varchar(50) NOT NULL COMMENT '创建用户,插入用户',
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updated_user` varchar(50) DEFAULT NULL COMMENT '更新用户',
  `product_txt` text COMMENT '产品内容描述html代码或者txt描述',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COMMENT='产品管理表';

-- ----------------------------
-- Records of t_platform_product
-- ----------------------------
INSERT INTO `t_platform_product` VALUES ('36', '完善', 'D:\\fileUpload\\img\\product_img\\完善-DEB204113A-2018718.jpg', '1', '完善', '<h1>国民医保首选</h1>', 'adfasdf', '2018-07-18 09:42:17', 'jiangxy', '2018-07-18 10:44:42', '2222', '完善行内修改');
INSERT INTO `t_platform_product` VALUES ('37', '完善02', 'D:\\fileUpload\\img\\product_img\\完善02-FB0E351E9E-2018718.jpg', '1', '完善02', '<span>2222</span>', '完善02', '2018-07-18 11:32:55', '完善02', '2018-07-18 13:24:21', 'jxy', '完善02');
INSERT INTO `t_platform_product` VALUES ('38', '完善04', 'D:\\fileUpload\\img\\product_img\\完善04-C8803066F3-2018718.jpg', '1', '完善04', '<span>04</span>', '完善04', '2018-07-18 11:39:21', 'jxy', '2018-07-27 14:43:28', '04', '完善04');
INSERT INTO `t_platform_product` VALUES ('39', 'aaa', 'D:\\fileUpload\\img\\product_img\\综合测试-5EBBB51B28-2018718.jpg', '1', '综合测试修改', '<span>AAAAAA</span>', '综合测试', '2018-07-18 11:52:16', 'A', '2018-07-25 18:28:51', 'aa', '综合测试');
INSERT INTO `t_platform_product` VALUES ('40', 'bbbb', 'D:\\fileUpload\\img\\product_img\\swaggeræµè¯-A92AE7981D-2018718.jpg', '1', '测试中文bbbbbbb', '<h1>bbbb</h1>', null, '2018-07-18 19:54:08', 'jxy', '2018-07-25 19:46:16', 'bbbbbb', '测试中文cccccccc');
INSERT INTO `t_platform_product` VALUES ('46', '0807', '6886B1AB2F_national_medical_insurance.jpg', '1', 'ceshi1', '<h5>abd</h5>', null, '2018-08-07 15:56:18', 'admin', '2018-08-07 15:56:18', null, '0807');
INSERT INTO `t_platform_product` VALUES ('47', 'chanpin1', 'B2414CF3B8_national_medical_insurance.jpg', '0', 'chanpin1', '<h1></h1>', null, '2018-08-07 18:33:56', 'admin', '2018-08-07 18:33:57', null, 'chanpin1');
INSERT INTO `t_platform_product` VALUES ('48', 'ceshi_05', 'A581E117E5_timg.jpg', '1', 'ceshi_05', '<h2>bjkb555</h2>', null, '2018-08-07 19:33:14', 'admin', '2018-08-27 14:50:24', 'admin', 'ceshi_05');
