package com.portal.student;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.portal.student.integration")
public class StudentportalApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentportalApplication.class, args);
	}

}
