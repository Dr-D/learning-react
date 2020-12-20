package com.drd.websocketspringboot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {
    private static final Logger LOGGER = LoggerFactory.getLogger(GreetingController.class);

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(Greeting greeting) throws Exception {
        LOGGER.info("greeting, message: '{}'", greeting);
//        Thread.sleep(1000); // simulated delay
        return new Greeting(greeting.getName(), HtmlUtils.htmlEscape(greeting.getMessage()));
    }
}
