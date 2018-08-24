package com.yaic.system.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * @ClassName Menu
 * @Description 左侧菜单
 * @Author jiangxy
 * @Date 2018-8-23  20:47
 * @Version 1.0.0
 */
public class Menu implements Serializable {

    private Integer id;

    private Integer levelId;

    private Boolean topElement;

    private String menuName;

    private List<Menu> childs = new ArrayList<>();

    private String href;

    private Integer displayOrder;

    public Menu(){}

    public Menu (Resource res){
        this.id = Integer.parseInt(res.getResourceId());
        this.levelId = res.getResourceLevel().intValue();
        this.menuName = res.getResourceName();
        this.href = res.getActionUrl();
        this.displayOrder = res.getDisplayOrder();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getLevelId() {
        return levelId;
    }

    public void setLevelId(Integer levelId) {
        this.levelId = levelId;
    }

    public Boolean getTopElement() {
        return topElement;
    }

    public void setTopElement(Boolean topElement) {
        this.topElement = topElement;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public List<Menu> getChilds() {
        return childs;
    }

    public void setChilds(List<Menu> childs) {
        this.childs = childs;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

}
