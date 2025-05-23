package br.com.adm.joao.backtrainee.service;

import br.com.adm.joao.backtrainee.dto.UserLoginRequest;
import br.com.adm.joao.backtrainee.dto.UserRegisterRequest;
import br.com.adm.joao.backtrainee.dto.UserResponse;
import br.com.adm.joao.backtrainee.model.UserModel;
import br.com.adm.joao.backtrainee.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional
    public UserResponse registerUser(UserRegisterRequest registrationRequest) {
        if(userRepository.existsByEmail(registrationRequest.getEmail()))
            throw new RuntimeException("Erro: Email já está em uso!");

        UserModel newUser = new UserModel();
        newUser.setNome(registrationRequest.getName());
        newUser.setEmail(registrationRequest.getEmail());

        newUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

        UserModel savedUser = userRepository.save(newUser);

        return new UserResponse(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
    }


    @Transactional(readOnly = true)
    public Optional<UserResponse> loginUser(UserLoginRequest loginRequest) {
        Optional<UserModel> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if(userOptional.isPresent()){
            UserModel user = userOptional.get();

            if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
                return Optional.of(new UserResponse(user.getId(), user.getName(), user.getEmail()));
        }

        return Optional.empty();
    }

}
