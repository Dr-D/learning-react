package com.drd.multipart_spring.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class PersonController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PersonController.class);

    @PostMapping("/person/uploadimage")
    public ResponseEntity<?> uploadPersonWithImage(@RequestPart("file") MultipartFile multipartFile,
                                                   @RequestPart("person") Person person) {
        LOGGER.info("multipartFile: '{}'", multipartFile.getName());
        LOGGER.info("Calling uploadPersonWithImage: [{}]", person);
        return ResponseEntity.ok("Upload called successfully");
    }

    static class Person {
        String name;
        Integer age;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }
    }
}
