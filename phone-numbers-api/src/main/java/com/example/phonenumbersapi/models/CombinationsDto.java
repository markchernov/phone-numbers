package com.example.phonenumbersapi.models;

import java.util.List;

public class CombinationsDto {

	private final int total;
	private final List<String> combinations;

	public CombinationsDto(int total, List<String> combinations) {
		this.total = total;
		this.combinations = combinations;
	}

	@Override
	public String toString() {
		return "Total: " + this.total + " Combinations: " + String.join(",", this.combinations);
	}

	public int getTotal() {
		return total;
	}

	public List<String> getCombinations() {
		return combinations;
	}

}