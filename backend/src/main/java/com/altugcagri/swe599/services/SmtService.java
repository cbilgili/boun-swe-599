package com.altugcagri.swe599.services;

import java.io.IOException;

public interface SmtService {

    String solveSmt(String smtRequest) throws IOException, InterruptedException;
}
