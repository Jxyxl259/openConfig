package com.yaic;

import com.yaic.platform.Run;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Run.class})
public class MainApplicationTest {

	@Autowired
	protected DataSource dataSource;

}