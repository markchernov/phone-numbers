package com.example.phonenumbersapi.services;

import java.util.ArrayList;
import java.util.List;
import com.example.phonenumbersapi.models.CombinationsDto;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Assertions;

@SpringBootTest
class CombinationsServiceTests {

        @Test
        void getCombinationsSuccessTest() {
                CombinationsService service = new CombinationsService();
                String input = "2345678";
                List<String> expected = new ArrayList<String>();
                expected.add("ADGJMPT");
                expected.add("BDGJMPT");
                expected.add("CDGJMPT");
                expected.add("AEGJMPT");
                expected.add("BEGJMPT");

                CombinationsDto result = service.getCombinations(input, 0, 5);
                List<String> combinations = result.getCombinations();

                Assertions.assertEquals(result.getTotal(), 2916);
                Assertions.assertIterableEquals(combinations, expected);
        }

        @Test
        void getCombinationsThrowsExceptionTest() {
                CombinationsService service = new CombinationsService();
                String input = "2345678";
                List<String> expected = new ArrayList<String>();
                expected.add("ADGJMPT");
                expected.add("BDGJMPT");
                expected.add("CDGJMPT");
                expected.add("AEGJMPT");
                expected.add("BEGJMPT");
                // start position is higher than total number of records
                Assertions.assertThrows(IllegalArgumentException.class, () -> service.getCombinations(input, 2917, 5));
                // numberOfRecords is higher than total number of records
                Assertions.assertThrows(IllegalArgumentException.class, () -> service.getCombinations(input, 2917, 5));
                // start position is negative
                Assertions.assertThrows(IllegalArgumentException.class, () -> service.getCombinations(input, -1, 5));

        }

}
