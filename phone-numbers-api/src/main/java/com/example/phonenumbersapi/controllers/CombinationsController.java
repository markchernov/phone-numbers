package com.example.phonenumbersapi.controllers;

import java.util.List;
import com.example.phonenumbersapi.models.CombinationsDto;
import com.example.phonenumbersapi.models.CombinationsRequestDto;
import com.example.phonenumbersapi.services.CombinationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin()
@RestController
public class CombinationsController {

	private CombinationsService combinationsService;

	@Autowired
	public void setCombinationsService(CombinationsService combinationService) {
		this.combinationsService = combinationService;
	}

	@PostMapping("/combinations")
	public CombinationsDto combinations(@RequestBody CombinationsRequestDto request) {
		CombinationsDto combinations = this.combinationsService.getCombinations(request.getPhoneNumber(),
				request.getStart(), request.getNumberOfRecords());
		return combinations;
	}
}