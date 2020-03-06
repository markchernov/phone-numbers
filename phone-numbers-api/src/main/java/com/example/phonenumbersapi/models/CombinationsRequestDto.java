package com.example.phonenumbersapi.models;

public class CombinationsRequestDto {

	private final String phoneNumber;
    private final int start;
    private final int numberOfRecords;
	
	public CombinationsRequestDto(String phoneNumber, int start, int numberOfRecords) {
		this.phoneNumber = phoneNumber;
        this.start = start;
        this.numberOfRecords = numberOfRecords;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public int getStart() {
		return start;
	}

	public int getNumberOfRecords() {
		return numberOfRecords;
	}

}


