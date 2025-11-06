package com.santu.Backend_Matrilab.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir:uploads/gallery}")
    private String uploadDir;

    @PostConstruct
    public void init() {
        System.out.println("╔════════════════════════════════════════════╗");
        System.out.println("║   WEBCONFIG LOADED SUCCESSFULLY!          ║");
        System.out.println("╚════════════════════════════════════════════╝");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded files from uploads/gallery directory
        // Get absolute path and ensure it ends with separator
        String uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize().toString();
        String resourceLocation = "file:///" + uploadPath.replace("\\", "/") + "/";
        
        System.out.println("╔═══════════════════════════════════════════════════════════════════╗");
        System.out.println("║           STATIC FILE CONFIGURATION                               ║");
        System.out.println("╠═══════════════════════════════════════════════════════════════════╣");
        System.out.println("║ Upload directory: " + uploadDir);
        System.out.println("║ Absolute path: " + uploadPath);
        System.out.println("║ Resource location: " + resourceLocation);
        System.out.println("╚═══════════════════════════════════════════════════════════════════╝");
        
        registry.addResourceHandler("/uploads/gallery/**")
                .addResourceLocations(resourceLocation)
                .setCachePeriod(0); // Disable caching for development
    }
}
