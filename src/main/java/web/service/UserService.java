package web.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import web.model.User;

public interface UserService extends UserDetailsService {
    void saveUser(User user);

    boolean deleteUser(Long id);

    User getUserById(Long id);

    Iterable<User> getAllUsers();
}
