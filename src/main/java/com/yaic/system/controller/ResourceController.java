package com.yaic.system.controller;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Predicate;
import com.google.common.collect.ConcurrentHashMultiset;
import com.google.common.collect.Iterables;
import com.yaic.common.CommonConstant;
import com.yaic.platform.common.ReturnMsg;
import com.yaic.servicelayer.util.CollectionUtil;
import com.yaic.system.dto.ResourceDto;
import com.yaic.system.entity.Menu;
import com.yaic.system.entity.Resource;
import com.yaic.system.service.ResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/resource")
public class ResourceController {

	private Logger logger = LoggerFactory.getLogger(ResourceController.class);
	
	@Autowired
	private ResourceService resourceService;

	@SuppressWarnings("unchecked")
	@RequestMapping(value="/menu", method= RequestMethod.GET, consumes = MediaType.ALL_VALUE)
	public ReturnMsg getGrantedMenuByUserId(HttpSession session){
		ReturnMsg msg = new ReturnMsg(false);
        List grantedResources = (List)session.getAttribute(CommonConstant.GRANTED_RESOURCES);

		if(!CollectionUtil.isEmpty(grantedResources)){
			Menu menu = new Menu();
			ConcurrentHashMultiset<Resource> chmsResources = ConcurrentHashMultiset.create(grantedResources);
			genMenu(menu, chmsResources);
			if(CollectionUtil.isNotEmpty(menu.getChilds())){
				msg.setSuccess(true);
				msg.setData(menu.getChilds());
			}
		} else {
		    msg.setMessage("您未被分配任何权限，请联系管理员...");
        }
		return msg;
	}

	/**
	 * 生成用户登录后显示在左侧菜单的原始json数据
	 * @param resources
	 * @return
	 */
	private void genMenu(Menu menu, ConcurrentHashMultiset<Resource> resources) {

		if(resources.isEmpty()){
			return;
		}

		// 组织父节点
		if(menu.getId() == null) {
			Iterables.removeIf(resources, new Predicate<Resource>() {
				@Override
				public boolean apply(Resource res) {
					if (res.getParentResourceId().equals(res.getResourceLevel() + "")) {
						menu.getChilds().add(new Menu(res));
						return true;
					} else {
						return false;
					}
				}
			});
		} else {// 组织子节点
			for (Resource res : resources) {
				if (res.getResourceLevel().intValue() == menu.getLevelId() + 1
						&& Integer.parseInt(res.getParentResourceId()) == menu.getId()){
					menu.getChilds().add(new Menu(res));
					resources.remove(res);
				}
			}
		}

		// 根节点下没有子节点（用户未分配任何菜单权限）
		if(menu.getId() == null && menu.getChilds().size() == 0){
			return;
		}else{
			menu.getChilds().sort(Comparator.comparing(Menu::getDisplayOrder));
			for(Menu childMenu : menu.getChilds()) {
				genMenu(childMenu, resources);
			}
		}

	}


	/**
	 * @Title: getPartnerList
	 * @Description: 获取当前节点下的所有子资源节点，异步获取数据节点方法
	 * @param parentId
	 * @return
	 * @return: ReturnMsg
	 */
	@RequestMapping(value = "/treelist", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
	public ReturnMsg getMenuList(@RequestParam(name="parentId") String parentId) {
		return resourceService.getListByPid(parentId);
	}
	
	@PostMapping(value = "/list")
	public ReturnMsg getMenuList() {
		return resourceService.getList();
	}

	@GetMapping(value="/delete/{resourceId}")
	public ReturnMsg delete(@PathVariable String resourceId){
		logger.info("delete resource by id:{}", resourceId);
		return resourceService.deleteById(resourceId);
	}
	
	@GetMapping(value="/getOne/{resourceId}")
	public ReturnMsg getOne(@PathVariable String resourceId){
		logger.info("get resource by id:{}", resourceId);
		return resourceService.getOneById(resourceId);
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg addInfo(@Valid ResourceDto resourceDto) {

		logger.info("add ResourceDto:{}", JSON.toJSONString(resourceDto));
		
		// 上传到指定图片路径和保存数据库数据
		return resourceService.addResource(resourceDto);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ReturnMsg updateInfo(@Valid ResourceDto resourceDto) {

		logger.info("update ResourceDto:{}", JSON.toJSONString(resourceDto));
		
		// 上传到指定图片路径和保存数据库数据
		return resourceService.updateResource(resourceDto);
	}
}