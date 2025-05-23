package br.com.adm.joao.backtrainee.controller;

import br.com.adm.joao.backtrainee.dto.UserLoginRequest;
import br.com.adm.joao.backtrainee.dto.UserRegisterRequest;
import br.com.adm.joao.backtrainee.dto.UserResponse;
import br.com.adm.joao.backtrainee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController{

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest registrationRequest){
        try{
            UserResponse userResponse = userService.registerUser(registrationRequest);
            return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest){
        Optional<UserResponse> userResponseOptional = userService.loginUser(loginRequest);

        if (userResponseOptional.isPresent())
            return ResponseEntity.ok(userResponseOptional.get());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos.");

    }
}