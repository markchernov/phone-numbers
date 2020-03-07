package com.example.phonenumbersapi.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.phonenumbersapi.models.CombinationsDto;

import org.springframework.stereotype.Service;

@Service
public class CombinationsService {

    private Map<String, List<String>> savedCombinations = new HashMap<>();

    private List<List<Character>> keypad = Arrays.asList(
        Arrays.asList('0'), 
        Arrays.asList('1'),
        Arrays.asList('A', 'B', 'C'),
        Arrays.asList('D', 'E','F'),
        Arrays.asList('G', 'H', 'I'),
        Arrays.asList('J', 'K', 'L'),
        Arrays.asList('M', 'N', 'O'),
        Arrays.asList('P', 'Q', 'R', 'S'),
        Arrays.asList('T', 'U', 'V'),
        Arrays.asList('W', 'X', 'Y', 'Z')
       
   );

    public CombinationsDto getCombinations(String phoneNumber, int start, int numberOfRecords) {
    
       List<String> fullList;
        System.out.println(phoneNumber + " " + start + " " + numberOfRecords);
        if (this.savedCombinations.get(phoneNumber) != null) {
            fullList = this.savedCombinations.get(phoneNumber);
        } else {
            fullList = this.calculateCombinations(phoneNumber);
            this.savedCombinations.put(phoneNumber, fullList);         
        }

        if(this.isValidArguments(fullList, start, numberOfRecords)) {   
            if (start + numberOfRecords > fullList.size()) {
                return new CombinationsDto(fullList.size(), fullList.subList(start, (fullList.size() - start) + start));
            } else {
                return new CombinationsDto(fullList.size(), fullList.subList(start, start + numberOfRecords));
            }             
           } else {
               throw new IllegalArgumentException("Wrong start or numberOfRecords");
        }       
    }
    
    private List<String> calculateCombinations(String phoneNumber) {	
        
        int[] input = this.buildArray(phoneNumber);
        List<String> output = new ArrayList<>();
        
        for (Character ch: this.keypad.get(input[0])) {
            output.add(String.valueOf(ch));
        }

        for(int i = 1; i < input.length; i++) {
            List<String> prevList = new ArrayList<>(output);
            output.clear();

            for(Character ch: this.keypad.get(input[i])) {
                for (String s: prevList) {
                    output.add(s + ch);
                }
            }
        }

        return output;
    }
    
    private int[] buildArray(String phoneNumber) {
        String[] strArr = phoneNumber.split("");
        int[] intArr = new int[strArr.length];
        for(int i = 0; i < strArr.length; i++) {
            String num = strArr[i];
            intArr[i] = Integer.parseInt(num);
        }
        return intArr;
    }

    private boolean isValidArguments(List<String> fullList, int start, int numberOfRecords) {
        if(start < 0 || start < fullList.size()) {
            return true;
        } else {
            return false;
        }
    }
}