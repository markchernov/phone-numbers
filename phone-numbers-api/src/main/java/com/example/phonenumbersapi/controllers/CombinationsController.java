package com.example.phonenumbersapi.controllers;

import java.util.Arrays;
import com.example.phonenumbersapi.models.CombinationsDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CombinationsController {

	@GetMapping("/combinations")	
	public CombinationsDto combinations() {	
		return new CombinationsDto(2, Arrays.asList("abc","xyz"));
	}
}