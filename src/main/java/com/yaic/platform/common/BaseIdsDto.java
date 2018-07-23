package com.yaic.platform.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;

/**
 * @Description:
 * @author: jiangxy
 * @date: 2018\7\20  11:34
 */
@ApiModel(value = "BaseIdsDto", description = "操作的多个对象的id信息，多个id之间使用\",\"隔开")
public class BaseIdsDto {

	@ApiModelProperty(hidden = true)
	@NotBlank(message = "不能为空")
	private String ids;

	public BaseIdsDto() {
	}

	public BaseIdsDto(String ids) {
		this.ids = ids;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}
}