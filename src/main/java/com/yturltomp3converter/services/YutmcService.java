package com.yturltomp3converter.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.github.felipeucelli.javatube.Stream;
import com.github.felipeucelli.javatube.Youtube;

@Service
public class YutmcService
{
    // INPUTSTREAM to BYTE[]

    private byte[] convertInputStreamToByteArray(InputStream inputStream) throws IOException
    {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream())
        {
            byte[] buffer = new byte[8192];

            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1)
            {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            return byteArrayOutputStream.toByteArray();
        }
    }

    // DOWNLOAD VIDEO

    public ResponseEntity<byte[]> downloadVideo(String url)
    {
        try
        {
            Youtube youtube = new Youtube(url,false);

            Stream videoStream = youtube.streams().getHighestResolution();

            URI videoUri = new URI(videoStream.getUrl());

            InputStream videoStreamInput = videoUri.toURL().openStream();

            byte[] videoBytes = convertInputStreamToByteArray(videoStreamInput);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.valueOf("video/mp4"));
            String fileName = URLEncoder.encode(videoStream.getTitle(), StandardCharsets.UTF_8) + ".mp4";
            headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());
            headers.add("Access-Control-Expose-Headers", "Content-Disposition");

            return new ResponseEntity<>(videoBytes, headers, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // DOWNLOAD AUDIO

    public ResponseEntity<byte[]> downloadAudio(String url)
    {
        try
        {
            Youtube youtube = new Youtube(url,false);

            Stream audioStream = youtube.streams().getOnlyAudio();

            URI audioUri = new URI(audioStream.getUrl());

            InputStream audioStreamInput = audioUri.toURL().openStream();

            byte[] audioBytes = convertInputStreamToByteArray(audioStreamInput);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.valueOf("audio/mpeg"));
            String fileName = URLEncoder.encode(audioStream.getTitle(), StandardCharsets.UTF_8) + ".mp3";
            headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());
            headers.add("Access-Control-Expose-Headers", "Content-Disposition");

            return new ResponseEntity<>(audioBytes, headers, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}