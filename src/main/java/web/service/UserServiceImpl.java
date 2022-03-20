package web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.model.User;
import web.repository.UserRepository;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public boolean deleteUser(Long userId) {
        if (userRepository.findById(userId).isPresent()) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.getUserById(userId);
    }

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll().stream() //сортировка отображения в таблице по userId
                .sorted(Comparator.comparing(User::getUserId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.getUserByUsername(username);
        if (user == null) throw new UsernameNotFoundException(username);
        return user;
    }
}