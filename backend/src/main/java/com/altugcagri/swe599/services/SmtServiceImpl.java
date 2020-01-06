package com.altugcagri.swe599.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
public class SmtServiceImpl implements SmtService {
    @Override
    public String solveSmt(String smtRequest) throws IOException, InterruptedException {

        final StringBuilder response = new StringBuilder("");

        //final Path smtFile = Paths.get("/Users/cagri.altug/Documents/boun/dev/swe-599/backend/output.smt2");
        final Path smtFilePath = Paths.get("/mathsat/request.smt2");

        if (smtFilePath.getFileName() != null) {
            smtFilePath.toFile().delete();
        }

        final File smtFile = Files.createFile(smtFilePath).toFile();
        final BufferedWriter writer = new BufferedWriter(new FileWriter(smtFile));
        writer.write(smtRequest);
        writer.close();

        final ProcessBuilder processBuilder = new ProcessBuilder();

        processBuilder.command("/mathsat/run.sh");

        final Process process = processBuilder.start();

        final int ret = process.waitFor();

        log.info("Program completed with code: " + ret);

        final File outPutFile = new  File("/mathsat/output");

        try (BufferedReader reader = new BufferedReader(new FileReader(outPutFile))) {
            log.info("try icersine girdi");
            String line;
            while ((line = reader.readLine()) != null) {
                log.info(line);
                response.append(line);
            }
            log.info("try dan cikti");
        }

        smtFile.delete();
        outPutFile.delete();
        log.info(String.valueOf(response));
        log.info("hey");
        log.info(response.toString());
        return response.toString();
    }
}
