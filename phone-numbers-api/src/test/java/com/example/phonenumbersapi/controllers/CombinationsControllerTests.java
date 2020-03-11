package com.example.phonenumbersapi.controllers;

import com.example.phonenumbersapi.models.CombinationsRequestDto;
import com.example.phonenumbersapi.services.CombinationsService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CombinationsController.class)
public class CombinationsControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CombinationsService service;

    @Test
    public void combinationControllerTest() throws Exception {
        ObjectMapper mapperObj = new ObjectMapper();
        mockMvc.perform(MockMvcRequestBuilders.post("/combinations")
                .content(mapperObj.writeValueAsString(new CombinationsRequestDto("123", 0, 3)))
                .contentType("application/json")).andExpect(MockMvcResultMatchers.status().isOk());
    }
}