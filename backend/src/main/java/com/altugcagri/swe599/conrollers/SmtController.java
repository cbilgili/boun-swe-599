package com.altugcagri.swe599.conrollers;

import com.altugcagri.swe599.conrollers.responses.SmtResponse;
import com.altugcagri.swe599.services.SmtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/v1/")
public class SmtController {

    private SmtService smtService;

    public SmtController(SmtService smtService) {
        this.smtService = smtService;
    }

    @PostMapping("/solve_smt")
    public ResponseEntity<SmtResponse> subscribeUserProfile(@RequestParam String smtRequest) throws IOException, InterruptedException {
        return ResponseEntity.ok().body(SmtResponse.builder().response(smtService.solveSmt(smtRequest)).build());
    }
}
