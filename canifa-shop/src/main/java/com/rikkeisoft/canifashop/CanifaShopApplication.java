package com.rikkeisoft.canifashop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class CanifaShopApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(CanifaShopApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(CanifaShopApplication.class);
	}

}
