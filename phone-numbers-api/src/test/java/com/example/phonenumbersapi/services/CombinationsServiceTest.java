package com.example.phonenumbersapi.services;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CombinationsServiceTests {

	@Test
	void combinations() {
        CombinationsService service = new CombinationsService();
        String input = "3405";
        List<String> result = service.getCombinations(input, 0, 5);
        System.out.println(result);
	}

}
