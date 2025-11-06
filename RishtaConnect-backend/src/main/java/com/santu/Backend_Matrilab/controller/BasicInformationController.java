//package com.santu.Backend_Matrilab.controller;
//
//import com.santu.Backend_Matrilab.dto.request.BasicInformationDTO;
//import com.santu.Backend_Matrilab.dto.response.BasicInformationResponse;
//import com.santu.Backend_Matrilab.service.interfac.BasicInformationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpStatus;
//
//import java.util.Map;
//
//import java.util.Collections;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
//@RestController
//@RequestMapping("/api/basic-information")
// // Replace with your React app's URL
//public class BasicInformationController {
//
//    @Autowired
//    private BasicInformationService basicInformationService;
//
//    // Save Basic Information
////    @PostMapping
////    public BasicInformationResponse saveBasicInformation(@RequestBody BasicInformationDTO requestDTO) {
////        return basicInformationService.saveBasicInformation(requestDTO);
////    }
//    @PostMapping
//    public ResponseEntity<?> saveBasicInformation(@RequestBody BasicInformationDTO requestDTO) {
//        try {
//            BasicInformationResponse response = basicInformationService.saveBasicInformation(requestDTO);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            // Return the error response if an exception occurs
//            Map<String, String> errorResponse = Collections.singletonMap("error", "Error saving basic information: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
//        }
//    }
//
//
//    // Get All Basic Information
//    @GetMapping
//    public List<BasicInformationResponse> getAllBasicInformation() {
//        return basicInformationService.getAllBasicInformation();
//    }
//
//    // Get Basic Information by ID
////    @GetMapping("/{id}")
////    public BasicInformationResponse getBasicInformationById(@PathVariable Long id) {
////        return basicInformationService.getBasicInformationById(id);
////    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getBasicInformationById(@PathVariable Long id) {
//        try {
//            BasicInformationResponse response = basicInformationService.getBasicInformationById(id);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Collections.singletonMap("error", "Error fetching data: " + e.getMessage()));
//        }
//    }
//
//
//    // Update Basic Information
//    @PutMapping("/{id}")
//    public BasicInformationResponse updateBasicInformation(
//            @PathVariable Long id,
//            @RequestBody BasicInformationDTO requestDTO) {
//        return basicInformationService.updateBasicInformation(id, requestDTO);
//    }
//}


//package com.santu.Backend_Matrilab.controller;
//
//import com.santu.Backend_Matrilab.dto.request.BasicInformationDTO;
//import com.santu.Backend_Matrilab.dto.response.BasicInformationResponse;
//import com.santu.Backend_Matrilab.service.interfac.BasicInformationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpStatus;
//
//import java.util.Map;
//import java.util.Collections;
//import java.util.List;
//import java.util.NoSuchElementException;
//
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
//@RestController
//@RequestMapping("/api/basic-information")
//public class BasicInformationController {
//
//    @Autowired
//    private BasicInformationService basicInformationService;
//
//    @PostMapping
//    public ResponseEntity<?> saveBasicInformation(@RequestBody BasicInformationDTO requestDTO) {
//        try {
//            BasicInformationResponse response = basicInformationService.saveBasicInformation(requestDTO);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Collections.singletonMap("error", "Error saving basic information: " + e.getMessage()));
//        }
//    }
//
//
//    @GetMapping
//    public List<BasicInformationResponse> getAllBasicInformation() {
//        return basicInformationService.getAllBasicInformation();
//    }
//
//    // ✅ UPDATED: Fetch Basic Information by userId instead of id
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<?> getBasicInformationByUserId(@PathVariable Long userId) {
//        try {
//            BasicInformationResponse response = basicInformationService.getBasicInformationByUserId(userId);
//            return ResponseEntity.ok(response);
//        } catch (NoSuchElementException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(Collections.singletonMap("error", e.getMessage()));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Collections.singletonMap("error", "Error fetching data: " + e.getMessage()));
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateBasicInformation(@PathVariable Long id, @RequestBody BasicInformationDTO requestDTO) {
//        try {
//            BasicInformationResponse response = basicInformationService.updateBasicInformation(id, requestDTO);
//            return ResponseEntity.ok(response);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(Collections.singletonMap("error", e.getMessage()));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Collections.singletonMap("error", "Error updating data: " + e.getMessage()));
//        }
//    }
//}
//

package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.request.BasicInformationDTO;
import com.santu.Backend_Matrilab.dto.response.BasicInformationResponse;
import com.santu.Backend_Matrilab.service.interfac.BasicInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/basic-information")
public class BasicInformationController {

    @Autowired
    private BasicInformationService basicInformationService;

    @PostMapping
    public ResponseEntity<?> saveBasicInformation(@RequestBody BasicInformationDTO requestDTO) {
        try {
            BasicInformationResponse response = basicInformationService.saveBasicInformation(requestDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error saving basic information: " + e.getMessage()));
        }
    }

    @GetMapping
    public List<BasicInformationResponse> getAllBasicInformation() {
        return basicInformationService.getAllBasicInformation();
    }

    // ✅ Fetch Basic Information by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBasicInformationByUserId(@PathVariable Long userId) {
        try {
            BasicInformationResponse response = basicInformationService.getBasicInformationByUserId(userId);
            if (response == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Basic Information not found for User ID: " + userId));
            }
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error fetching data: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBasicInformation(@PathVariable Long id, @RequestBody BasicInformationDTO requestDTO) {
        try {
            BasicInformationResponse response = basicInformationService.updateBasicInformation(id, requestDTO);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error updating data: " + e.getMessage()));
        }
    }
}
