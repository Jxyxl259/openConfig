package com.yaic.otherTest;

import com.google.common.base.Predicate;
import com.google.common.collect.ConcurrentHashMultiset;
import com.google.common.collect.Iterables;
import com.yaic.servicelayer.util.CollectionUtil;
import com.yaic.system.entity.Menu;
import com.yaic.system.entity.Resource;

import java.util.Comparator;
import java.util.HashSet;

/**
 * @ClassName MenuTest
 * @Description
 * @Author jiangxy
 * @Date 2018\8\23 0023 21:28
 * @Version 1.0.0
 */
public class MenuTest {


    public static void main(String[] args) {

        Resource res_1 = new Resource("101","平台管理", (short)1, "1","Nan",1);
        Resource res_2 = new Resource("10101","合作商", (short)2, "101","Nan",1);
        Resource res_3 = new Resource("10102","产品", (short)2, "101","Nan",2);
        Resource res_4 = new Resource("10103","账号", (short)2, "101","Nan",3);
        Resource res_5 = new Resource("102","系统管理", (short)1, "1","Nan",2);
        Resource res_6 = new Resource("10201","系统", (short)2, "102","Nan",1);
        Resource res_7 = new Resource("10202","用户", (short)2, "102","Nan",2);
        Resource res_8 = new Resource("10203","角色", (short)2, "102","Nan",3);

        HashSet<Resource> ress = new HashSet<>();
        ress.add(res_1);
        ress.add(res_2);
        ress.add(res_3);
        ress.add(res_4);
        ress.add(res_5);
        ress.add(res_6);
        ress.add(res_7);
        ress.add(res_8);

        ConcurrentHashMultiset<Resource> ccress = ConcurrentHashMultiset.create(ress);

        Menu m = new Menu();
        genMenu(m, ccress);

        System.out.println(m);
    }



    private static void genMenu(Menu menu, ConcurrentHashMultiset<Resource> resources) {

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
        if(menu.getId() == null && menu.getChilds().size() == 0){
            return;
        }else{
            menu.getChilds().sort(Comparator.comparing(Menu::getDisplayOrder));
            for(Menu childMenu : menu.getChilds()) {
                genMenu(childMenu, resources);
            }
        }

    }


//    private static void genMenu(Menu menu, ConcurrentHashMultiset<Resource>  resources) {
//
//        if(resources.isEmpty()){
//            return;
//        }
//
//        if(menu.getId() == 0) {
//            Iterables.removeIf(resources, new Predicate<Resource>() {
//                @Override
//                public boolean apply(Resource res) {
//                    if (res.getParentResourceId().equals(res.getResourceLevel() + "")) {
//                        Menu topMenu = new Menu();
//                        topMenu.setId(Integer.parseInt(res.getResourceId()));
//                        topMenu.setLevelId(res.getResourceLevel().intValue());
//                        topMenu.setMenuName(res.getResourceName());
//                        topMenu.setHref(res.getActionUrl());
//                        menu.getChilds().add(topMenu);
//                        return true;
//                    } else {
//                        return false;
//                    }
//                }
//            });
//        } else {
//            for (Resource res : resources) {
//                if (res.getResourceLevel().intValue() == menu.getLevelId() + 1
//                        && Integer.parseInt(res.getParentResourceId()) == menu.getId()){
//                    Menu childMenu = new Menu();
//                    childMenu.setId(Integer.parseInt(res.getResourceId()));
//                    childMenu.setLevelId(res.getResourceLevel().intValue());
//                    childMenu.setMenuName(res.getResourceName());
//                    childMenu.setHref(res.getActionUrl());
//                    menu.getChilds().add(childMenu);
//                    resources.remove(res);
//                }
//            }
//        }
//        if(menu.getId() == 0 && menu.getChilds().size() == 0){
//            return;
//        }else{
//            for(Menu childMenu : menu.getChilds()) {
//                genMenu(childMenu, resources);
//            }
//        }
//
//    }

}
