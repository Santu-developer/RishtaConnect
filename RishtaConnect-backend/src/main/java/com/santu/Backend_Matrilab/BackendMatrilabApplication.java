package com.santu.Backend_Matrilab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BackendMatrilabApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendMatrilabApplication.class, args);
		System.out.println("Jay Shree Ganesh");
		System.out.println("Jay Shree Ram");
	}

}
