package com.drd.websocketspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@SpringBootApplication
public class WebsocketSpringbootApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebsocketSpringbootApplication.class, args);
	}
}
