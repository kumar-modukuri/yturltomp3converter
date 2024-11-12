package com.yturltomp3converter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yturltomp3converter.services.YutmcService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class YutmcController
{
    @Autowired
    private YutmcService service;

    // DOWNLOAD VIDEO

    @GetMapping("/video")
    public ResponseEntity<byte[]> downloadVideo(@RequestParam String url)
    {
        return service.downloadVideo(url);
    }

    // DOWNLOAD AUDIO
    
    @GetMapping("/audio")
    public ResponseEntity<byte[]> downloadAudio(@RequestParam String url)
    {
        return service.downloadAudio(url);
    }
}